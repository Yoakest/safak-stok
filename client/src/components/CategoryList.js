import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import alertify from "alertifyjs";
import axios from "../utils/axios.js";
import { Link } from "react-router-dom";


const CategoryList = ({ key }) => {
    const [categories, setCategories] = useState([]);

    // Kategorileri getir
    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/category");
            setCategories(data.data);
        } catch (err) {
            alertify.error("Kategoriler alınamadı.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [key]);

    // Silme işlemi
    const handleDelete = async (id) => {
        if (window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
            try {
                await axios.delete(`/category/${id}`)

                alertify.success("Kategori silindi.");
                fetchCategories(); // listeyi güncelle

            } catch (err) {
                alertify.error("Sunucu hatası.");
            }
        }
    };

    return (
        <Container className="mt-5">
            <h3>Kategoriler</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adı</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat, index) => (
                        <tr key={cat.id}>
                            <td>{index + 1}</td>
                            <td><Link style={{ textDecoration: "none", color: "inherit" }} as={Link} to={`/category-product/${cat.id}`}>{cat.name}</Link></td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" as={Link} to={`/category/${cat.id}`}
                                >
                                    Düzenle
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(cat.id)}>
                                    Sil
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container >
    );
};

export default CategoryList;
