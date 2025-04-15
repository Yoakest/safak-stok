import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);


    const getProducts = async () => {
        try {
            const { data } = await axios.get("/product?category=true");
            await setProducts(data.data);
        } catch (error) {
            console.error("Ürünler alınırken hata oluştu:", error);
        }
    };


    const getCategories = async () => {
        try {
            const { data } = await axios.get("/category");
            setCategories(data.data);
        } catch (error) {
            console.error("Kategoriler alınırken hata:", error);
        }
    };

    const filteredProducts = selectedCategoryIds.length === 0
    ? products
    : products.filter((p) =>
        p.Categories?.some((cat) => selectedCategoryIds.includes(cat.id))
    );



    const handleDelete = async (id) => {
        if (window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
            try {
                await axios.delete(`/product/${id}`);

                alertify.success("Ürün silindi.");
                await getProducts();
            } catch (error) {
                console.log(error);
            };
        };
        console.log(products)
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    return (

        <Container className="mt-5">
            <div className="mb-3">
                <strong>Kategorilere göre filtrele:</strong>
                <div className="d-flex flex-wrap">
                    {categories.map((cat) => (
                        <div key={cat.id} className="me-3">
                            <label>
                                <input
                                    type="checkbox"
                                    value={cat.id}
                                    checked={selectedCategoryIds.includes(cat.id)}
                                    onChange={(e) => {
                                        const id = Number(e.target.value);
                                        const checked = e.target.checked;

                                        setSelectedCategoryIds(prev =>
                                            checked
                                                ? [...prev, id]
                                                : prev.filter(cid => cid !== id)
                                        );
                                    }}
                                />{" "}
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Ürün Listesi</h3>

                <Button as={Link} to="/product/create" variant="success">Yeni Ürün Ekle</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adı</th>
                        <th>Kodu</th>
                        <th>Marka</th>
                        <th>Palet içi adet</th>
                        <th>Paket içi adet</th>
                        <th>Toplam Ürün</th>
                        <th>Toplam Palet</th>
                        <th>Gizli mi?</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? filteredProducts.map((p, index) => (
                        // ...


                        <tr key={p.id}>
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
                            <td>{p.code}</td>
                            <td>{p.brand}</td>
                            <td>{p.pallet_quantity}</td>
                            <td>{p.box_quantity}</td>
                            <td>{p.total_product_quantity}</td>
                            <td>{p.total_pallet_quantity}</td>
                            <td>
                                <Badge bg={p.hide ? "danger" : "success"}>
                                    {p.hide ? "Gizli" : "Görünür"}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    as={Link}
                                    to={`/product/${p.id}`}
                                    size="sm"
                                    variant="warning"
                                    className="me-2"
                                >
                                    Düzenle
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Sil
                                </Button>
                            </td>
                        </tr>

                    )) : (
                        <tr>
                            <td colSpan="10" className="text-center">Ürün bulunamadı.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductList;
