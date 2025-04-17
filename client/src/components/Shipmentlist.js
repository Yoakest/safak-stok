import axios from "../utils/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ShipmentList = () => {
    const [shipments, setShipments] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [shipmentRes, productRes] = await Promise.all([
                axios.get("/shipment"),
                axios.get("/product"),
            ]);

            setShipments(shipmentRes.data.data);
            setProducts(productRes.data.data);
        };

        fetchData();
    }, []);

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


    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">📦 Gönderi Listesi</h2>
            <button className="btn btn-outline-success" onClick={() => navigate("/shipment/create")}>
                + Sevkiyat Oluştur
            </button>

            <div className="mb-4">
                <label className="form-label fw-bold">Ürün Seç:</label>
                <select
                    className="form-select"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">Tüm Ürünler</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name} ({product.code})
                        </option>
                    ))}
                </select>
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
        </div>
    );
};

export default ShipmentList;
