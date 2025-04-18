import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const PalletList = () => {
    const [pallets, setPallets] = useState([]);
    const [filteredPallets, setFilteredPallets] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            const palletRes = await axios.get("/pallet");
            const productRes = await axios.get("/product");

            setPallets(palletRes.data.data);
            setFilteredPallets(palletRes.data.data);
            setProducts(productRes.data.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedProductId === "all") {
            setFilteredPallets(pallets);
        } else {
            setFilteredPallets(
                pallets.filter(p => p.productId == selectedProductId)
            );
        }
    }, [selectedProductId, pallets]);

    return (
        <div className="container mt-4">
            <h3 className="mb-3 text-success">📦 Palet Listesi</h3>

            <div className="mb-3">
                <label>Ürün Seç</label>
                <select
                    className="form-control"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="all">Tüm Ürünler</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} - {p.code}
                        </option>
                    ))}
                </select>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>Palet No</th>
                            <th>Ürün Adı</th>
                            <th>Ürün Kodu</th>
                            <th>Miktar</th>
                            <th>Depo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPallets.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.Product?.name || "—"}</td>
                                <td>{p.Product?.code || "—"}</td>
                                <td>{p.quantity}</td>
                                <td>{p.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PalletList;
