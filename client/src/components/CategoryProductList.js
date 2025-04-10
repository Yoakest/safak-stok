import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../utils/axios';
import { Container, Table, Badge } from "react-bootstrap";

const CategoryProductList = () => {
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    // Kategoriyi ürünler ile birlikte getir
    const getCategory = async () => {
        try {
            const { data } = await axios.get(`/category/${id}?product=true`);
            setCategory(data.data);
            setProducts(data.data.Products)
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        getCategory();
    }, []);
    if (!category) {
        return <Container className="mt-5">Kategori bulunamadı.</Container>; // Kategori yüklenmemişse bir mesaj göster.
    }

    return (
        <Container className="mt-5">
            <h3>{category.name} içerisindeki ürünler</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adı</th>
                        <th>Kodu</th>
                        <th>Marka</th>
                        <th>Palet içi adet</th>
                        <th>Paket içi adet</th>
                        <th>Toplam Stok miktarı</th>
                        <th>Toplam Palet miktarı</th>
                        <th>Gizle</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((p, index) => (
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                Ürün bulunamadı.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default CategoryProductList;