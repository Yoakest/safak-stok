import React, { useState, useEffect } from "react";
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import axios from "../utils/axios";

const ShipmentCreate = () => {
    const [shipmentDate, setShipmentDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // YYYY-MM-DD formatında tarih
    });

    const [customer, setCustomer] = useState("");
    const [shipmentNo, setShipmentNo] = useState("");
    const [shipmentType, setShipmentType] = useState("entry");
    const [warehouse, setWarehouse] = useState("Pharmastar");

    const [products, setProducts] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [palletList, setPalletList] = useState([]);
    const [totalPalletList, setTotalPalletList] = useState([]);

    // Sayfa ilk yüklendiğinde bir kez çalışır
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/product");
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

    // shipmentType değiştiğinde çalışır
    useEffect(() => {
        if (shipmentType === "entry") {
            setCustomer("Pharmastar");
        } else {
            setCustomer("");
        }
    }, [shipmentType]);


    const handleQuantityChange = (productId, value) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [productId]: value,
        });
    };

    const handleAddPallet = (product) => {
        const quantity = parseInt(selectedQuantities[product.id]) || 0;
        if (quantity <= 0) return;

        // Yeni paleti palletList'e ekle
        const newPallet = {
            location: warehouse,
            quantity: quantity,
            productId: product.id,
        };
        setPalletList([...palletList, newPallet]);

        // Toplam palet listesi güncelle
        const existing = totalPalletList.find((item) => item.productId === product.id);
        if (existing) {
            const updatedList = totalPalletList.map((item) =>
                item.productId === product.id
                    ? {
                        ...item,
                        pallets: item.pallets + 1,
                        total_quantity: item.total_quantity + quantity,
                    }
                    : item
            );
            setTotalPalletList(updatedList);
        } else {
            setTotalPalletList([
                ...totalPalletList,
                {
                    productId: product.id,
                    pallets: 1,
                    total_quantity: quantity,
                },
            ]);
        }

        // input sıfırla
        // setSelectedQuantities({
        //     ...selectedQuantities,
        //     [product.id]: "",
        // });
    };

    const handleRemovePallet = (indexToRemove) => {
        const removedPallet = palletList[indexToRemove];

        // Yeni palet listesi
        const newPalletList = palletList.filter((_, index) => index !== indexToRemove);
        setPalletList(newPalletList);

        // totalPalletList'i güncelle
        const updatedTotal = totalPalletList.map(item => {
            if (item.productId === removedPallet.productId) {
                return {
                    ...item,
                    pallets: item.pallets - 1,
                    total_quantity: item.total_quantity - removedPallet.quantity
                };
            }
            return item;
        }).filter(item => item.pallets > 0); // 0 olanları çıkar

        setTotalPalletList(updatedTotal);
    };

    const handleSubmit = () => {
        const shipmentData = {
            no: parseInt(shipmentNo),
            shipment_date: shipmentDate,
            customer,
            type: shipmentType === "entry",
            pallet_list: palletList,
            total_pallet_list: totalPalletList
        };

        console.log("🚚 Oluşturulan Sevkiyat:", shipmentData);
        axios.post("/shipment", shipmentData);
    };



    return (
        <Container className="mt-5">
            <h3>📦 Sevkiyat Oluştur</h3>
            <Form>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Sevkiyat No</Form.Label>
                            <Form.Control
                                type="number"
                                value={shipmentNo}
                                onChange={(e) => setShipmentNo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Sevkiyat Tarihi</Form.Label>
                            <Form.Control
                                type="date"
                                value={shipmentDate}
                                onChange={(e) => setShipmentDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Müşteri Adı</Form.Label>
                            <Form.Control
                                type="text"
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                                disabled={shipmentType === "entry"}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Sevkiyat Türü</Form.Label>
                            <Form.Select
                                value={shipmentType}
                                onChange={(e) => setShipmentType(e.target.value)}
                            >
                                <option value="entry">Giriş</option>
                                <option value="exit">Çıkış</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* GİRİŞ İSE AÇILSIN */}
                {shipmentType === "entry" && (
                    <>
                        <hr />
                        <h5>🚚 Giriş Detayları</h5>

                        <Form.Group className="mb-3" controlId="warehouse">
                            <Form.Label>Hangi Depoya Geldi?</Form.Label>
                            <Form.Select
                                value={warehouse}
                                onChange={(e) => setWarehouse(e.target.value)}
                            >
                                <option value="Pharmastar">Pharmastar</option>
                                <option value="Logismart">Logismart</option>
                            </Form.Select>
                        </Form.Group>

                        <h6>📋 Ürün Listesi</h6>
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>Adı</th>
                                    <th>Kodu</th>
                                    <th>Marka</th>
                                    <th>Palet içi Adet</th>
                                    <th>Paket içi Adet</th>
                                    <th>Adet</th>
                                    <th>Ekle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.code}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.pallet_quantity}</td>
                                        <td>{product.box_quantity}</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                value={selectedQuantities[product.id] || ""}
                                                onChange={(e) =>
                                                    handleQuantityChange(product.id, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleAddPallet(product)}
                                            >
                                                Ekle
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Form>

            {palletList.length > 0 && (
                <>
                    <h6>📦 Eklenen Paletler</h6>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Depo</th>
                                <th>Ürün Adı</th>
                                <th>Ürün Kodu</th>
                                <th>Adet</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {palletList.map((pallet, index) => {
                                const product = products.find(p => p.id === pallet.productId);
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pallet.location}</td>
                                        <td>{product?.name || "-"}</td>
                                        <td>{product?.code || "-"}</td>
                                        <td>{pallet.quantity}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemovePallet(index)}
                                            >
                                                Sil
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}


            {totalPalletList.length > 0 && (
                <>
                    <h6>📊 Toplam Palet Özeti</h6>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ürün Adı</th>
                                <th>Ürün Kodu</th>
                                <th>Toplam Palet</th>
                                <th>Toplam Adet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalPalletList.map((item, index) => {
                                const product = products.find(p => p.id === item.productId);
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product?.name || "-"}</td>
                                        <td>{product?.code || "-"}</td>
                                        <td>{item.pallets}</td>
                                        <td>{item.total_quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}

            <Button variant="primary" className="mt-3" onClick={handleSubmit}>
                🚀 Sevkiyat Oluştur
            </Button>


        </Container>
    );
};

export default ShipmentCreate;
