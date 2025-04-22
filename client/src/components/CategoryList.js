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
            await axios.get("/category").then(
                ({ data }) => {
                    setCategories(data.data);
                }
            );
        } catch (err) {
            alertify.error("Kategoriler alınamadı.");
        };
    };

    useEffect(() => {
        fetchCategories();
    }, [key]);

    // Silme işlemi
    const handleDelete = async (id) => {
        if (window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
            try {
                await axios.delete(`/category/${id}`).then(
                    ({ data }) => {
                        alertify.success(data.data);
                    }
                );

                fetchCategories(); // listeyi güncelle

            } catch (error) {
                console.log(error);
                alertify.error("Sunucu hatası.");
            }
        }
    };

    const handleOrder = async (id) => {
        try {
            await axios.put(`/category/order/${id}`).then(
                ({ data }) => {
                    alertify.success("Kategori yeri değiştirildi")
                    fetchCategories(); // listeyi güncelle
                }
            );
        } catch (error) {
            console.log(error);
            alertify.error("Sunucu hatası.");
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
                            <td>{cat.name}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" as={Link} to={`/category/${cat.id}`}
                                >
                                    Düzenle
                                </Button>
                                <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(cat.id)}>
                                    Sil
                                </Button>
                                {index !== categories.length - 1 && (
                                    <Button
                                        style={{ transform: "scaleY(-1)" }}
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleOrder(cat.id)}
                                    >
                                        ⇪
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container >
    );
};

export default CategoryList;
