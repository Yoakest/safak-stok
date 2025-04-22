import React, { useCallback, useEffect, useState } from "react";
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
        Categories: []
    });

    const [newProduct, setNewProduct] = useState({});
    const [categories, setCategories] = useState([]);

    const getProduct = useCallback(async () => {
        try {
            const { data } = await axios.get(`/product/${id}?category=true`);
            const product = data.data;

            // Kategori ID'lerini ayrı bir dizi olarak al
            const categoryIdArray = product.Categories.map(c => c.id);

            setForm({
                ...product,
                categoryId: categoryIdArray, // sadece ID dizisi
            });

        } catch (error) {
            console.error("Ürün alınamadı:", error);
        }
    }, [id]);


    const getCategories = useCallback(async () => {
        try {
            const { data } = await axios.get('/category');
            setCategories(data.data);
        } catch (error) {
            console.error("Kategoriler alınamadı.", error);
        };
    }, []);

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/product/${id}`, newProduct).then((data) => {
                if (data.data.status === "success") {
                    alertify.success("Ürün güncellendi");
                } else {
                    alertify.error("Sunucu hatası oluştu")
                };
            })
            navigate("/product"); // liste sayfasına dön
        } catch (error) {
            if (error.response.status === 400) {
                error.response.data.errors.forEach((e) => {
                    alertify.error(e.msg);
                })
            } else {
                alertify.error("Sunucu hatası oluştu");
            };
        }
    };

    useEffect(() => {
        getProduct();
        getCategories();
    }, [getProduct, getCategories]);

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
                        name="pallet_quantity şafaköç"
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

                <Form.Group className="mb-3">
                    <Form.Label>Kategoriler</Form.Label>
                    <div>
                        {categories.map((cat) => (
                            <Form.Check
                                key={cat.id}
                                type="checkbox"
                                label={cat.name}
                                value={cat.id}
                                checked={form.categoryId?.includes(cat.id)} // kontrollü!
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const isChecked = e.target.checked;

                                    setForm((prev) => ({
                                        ...prev,
                                        categoryId: isChecked
                                            ? [...prev.categoryId, id] // seçili değilse ekle
                                            : prev.categoryId.filter((cId) => cId !== id), // seçiliyse çıkar
                                    }));

                                    // API'ye göndermek için ayrı newProduct state'in varsa onu da güncelle:
                                    setNewProduct((prev) => ({
                                        ...prev,
                                        categoryId: isChecked
                                            ? [...(prev.categoryId || form.categoryId), id]
                                            : (prev.categoryId || form.categoryId).filter((cId) => cId !== id),
                                    }));
                                }}
                            />
                        ))}
                    </div>
                </Form.Group>


                <Button type="submit" variant="primary">Kaydet</Button>
            </Form>
        </Container>
    );
};

export default ProductUpdate;
