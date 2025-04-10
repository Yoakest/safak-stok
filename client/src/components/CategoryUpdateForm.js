import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";
import alertify from "alertifyjs";

const UpdateCategory = () => {
    const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`/category/${id}`);
            setName(data.data.name); // veya: setName(data.data.name);
        } catch (err) {
            alertify.error("Kategori getirilirken hata oluştu.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/category/${id}`, { name });
            alertify.success("Kategori güncellendi.");
            navigate("/category"); // geri liste sayfasına yönlendir
        } catch (err) {
            alertify.error("Güncelleme başarısız.");
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <Form onSubmit={handleSubmit} className="mt-5" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Form.Group controlId="categoryName" className="mb-3">
                <Form.Label>Kategori Adı</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Bir kategori adı giriniz."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Kaydet
            </Button>
        </Form>
    );
};

export default UpdateCategory;
