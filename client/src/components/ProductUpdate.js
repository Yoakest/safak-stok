import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Container, Form, Button } from "react-bootstrap";
import alertify from "alertifyjs";

const ProductUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        code: "",
        brand: "",
        pallet_quantity: "",
        box_quantity: "",
        hide: false,
    });
    const [newProduct, setNewProduct] = useState({});

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${id}`);
            setForm(data.data);
        } catch (error) {
            console.error("Ürün alınamadı:", error);
        }
    };

    const handleChange = async (e) => {
        console.log(e.target);
        const { name, value, type, checked } = e.target;
        await setNewProduct(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        await setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        console.log(newProduct);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(newProduct);
            await axios.put(`/product/${id}`, newProduct);
            alertify.success("Ürün güncellendi.");
            navigate("/product"); // liste sayfasına dön
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            alertify.error("Güncelleme başarısız.");
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <Container className="mt-5">
            <h3>Ürünü Düzenle</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Adı</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Kodu</Form.Label>
                    <Form.Control
                        type="text"
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Palet içi adet</Form.Label>
                    <Form.Control
                        type="text"
                        name="pallet_quantity"
                        value={form.pallet_quantity}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Paket içi adet</Form.Label>
                    <Form.Control
                        type="text"
                        name="box_quantity"
                        value={form.box_quantity}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Ürünü gizle"
                        name="hide"
                        checked={form.hide}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Kaydet</Button>
            </Form>
        </Container>
    );
};

export default ProductUpdate;
