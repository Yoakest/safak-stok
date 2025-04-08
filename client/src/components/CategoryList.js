import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import alertify from "alertifyjs";

const CategoryList = ({ key }) => {
    const [categories, setCategories] = useState([]);

    // Kategorileri getir
    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/category");
            const data = await res.json();
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
                const res = await fetch(`http://localhost:5001/api/category/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    alertify.success("Kategori silindi.");
                    fetchCategories(); // listeyi güncelle
                } else {
                    alertify.error("Silme işlemi başarısız.");
                }
            } catch (err) {
                alertify.error("Sunucu hatası.");
            }
        }
    };

    // Düzenleme yönlendirmesi (daha sonra bir form sayfasına yönlendirilecek)
    const handleEdit = (id) => {
        alertify.message(`Düzenleme sayfasına git: ID ${id}`);
        // burada navigate(`/category/edit/${id}`) gibi bir şey yapılabilir
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
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(cat.id)}>
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
        </Container>
    );
};

export default CategoryList;
