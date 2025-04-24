import alertify from "alertifyjs";
import axios from "../utils/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"


const ShipmentList = () => {
    const [shipments, setShipments] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const [shipmentRes, categoryRes] = await Promise.all([
    //             await axios.get("/shipment"),
    //             await axios.get("/category?product=true"),
    //         ]);

    //         console.log(shipmentRes);

    //         setShipments(shipmentRes.data.data);
    //         var newOptions = [];
    //         categoryRes.data.data.forEach((c) => {
    //             const optionGroup = {
    //                 label: c.name,
    //                 options: [],
    //             };

    //             c.Products.forEach((p) => {
    //                 optionGroup.options.push({
    //                     value: p.id,
    //                     label: p.name,
    //                 });
    //             });

    //             newOptions.push(optionGroup);
    //         });
    //         setCategoryOptions(newOptions);
    //     };

    //     fetchData();
    // }, []);

    const filteredShipments = selectedProductId
        ? shipments.filter((shipment) =>
            shipment.total_pallet_list.some(
                (item) => item.productId === parseInt(selectedProductId)
            )
        )
        : shipments;

    const formatDate = (isoDate) => {
        if (!isoDate) return "—";
        const [year, month, day] = isoDate.split("-");
        return `${day}.${month}.${year}`;
    };

    const fetchShipments = async (page) => {
        try {
            const res = await axios.get(`/shipment?page=${page}&limit=10`);
            setShipments(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            alertify.error("Sevkiyatlar alınamadı.");
        }
    };

    useEffect(() => {
        fetchShipments(page);
    }, [page]);



    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">📦 Gönderi Listesi</h2>
            <button className="btn btn-outline-success" onClick={() => navigate("/shipment/create")}>
                + Sevkiyat Oluştur
            </button>

            <div className="mb-4">
                <label className="form-label fw-bold">Ürün Seç:</label>
                <Select
                    options={categoryOptions}
                    onChange={(option) => setSelectedProductId(option?.value)}
                    isClearable
                    placeholder="Ürün seçin..."
                />
            </div>

            {filteredShipments.length === 0 && (
                <div className="alert alert-warning">Gösterilecek gönderi bulunamadı.</div>
            )}

            {filteredShipments.map((shipment) => (
                <div key={shipment.id} className="card shadow-sm border-1 border-success mb-4">
                    <div
                        className={`card-header text-white ${shipment.type ? 'bg-success' : 'bg-secondary'}`}
                    >
                        <div className="d-flex justify-content-between flex-wrap">
                            <span><strong>📅 Tarih:</strong> {formatDate(shipment.shipment_date) || "Yok"}</span>
                            <span><strong>🚚 Gönderi No:</strong> {shipment.no}</span>
                            <span><strong>👤 Müşteri:</strong> {shipment.customer}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Ürün Adı</th>
                                        <th>Ürün Kodu</th>
                                        <th>Toplam Palet</th>
                                        <th>Toplam Miktar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shipment.total_pallet_list.map((palletSummary) => {
                                        const product = shipment.Products.find(
                                            (p) => p.id === palletSummary.productId
                                        );
                                        return (
                                            <tr key={palletSummary.productId}>
                                                <td>{product?.name || "—"}</td>
                                                <td>{product?.code || "—"}</td>
                                                <td>{palletSummary.pallets}</td>
                                                <td>{palletSummary.total_quantity}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-center gap-2 mt-4">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    ⬅ Önceki
                </button>
                <span className="align-self-center">Sayfa {page} / {totalPages}</span>
                <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Sonraki ➡
                </button>
            </div>

        </div>
    );
};

export default ShipmentList;
