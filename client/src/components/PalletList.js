import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Select from "react-select"


const PalletList = () => {
    const [pallets, setPallets] = useState([]);
    const [filteredPallets, setFilteredPallets] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            const palletRes = await axios.get("/pallet");
            const categoryRes = await axios.get("/category?product=true");

            setPallets(palletRes.data.data);
            var newOptions = [];
            categoryRes.data.data.forEach((c) => {
                const optionGroup = {
                    label: c.name,
                    options: [],
                };

                c.Products.forEach((p) => {
                    optionGroup.options.push({
                        value: p.id,
                        label: p.name,
                    });
                });

                newOptions.push(optionGroup);
            });
            setCategoryOptions(newOptions);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedProductId === "all") {
            setFilteredPallets(pallets);
        } else if (selectedProductId === undefined) {
            setFilteredPallets(pallets);
        }
        else {
            console.log(selectedProductId)
            setFilteredPallets(
                pallets.filter(p => p.productId === selectedProductId)
            );
        }
    }, [selectedProductId, pallets]);

    return (
        <div className="container mt-4">
            <h3 className="mb-3 text-success">📦 Palet Listesi</h3>

            <div className="mb-3">
                <label>Ürün Seç</label>
                <Select
                    options={categoryOptions}
                    onChange={(option) => setSelectedProductId(option?.value)}
                    isClearable
                    placeholder="Ürün seçin..."
                />
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
