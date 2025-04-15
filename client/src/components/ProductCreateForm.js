import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "../utils/axios.js";
import alertify from "alertifyjs";

const ProductCreateForm = () => {
    const [product, setProduct] = useState({
        name: "",
        code: "",
        brand: "",
        pallet_quantity: "",
        box_quantity: "",
        categoryId: [],
        hide: false,
    });

    const [categories, setCategories] = useState([]);

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
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Gönderilen veri:");
        console.log(product);
        axios.post('/product', product) // backend'e gönderilebilir
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
            <h3>Ürün Oluştur</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Ürün Adı</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ürün adı"
                        value={product.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ürün Kodu</Form.Label>
                    <Form.Control
                        type="text"
                        name="code"
                        placeholder="Ürün kodu"
                        value={product.code}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Marka"
                        value={product.brand}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Palet İçi Miktar</Form.Label>
                    <Form.Control
                        type="text"
                        name="pallet_quantity"
                        placeholder="Örn: 400,500"
                        value={product.pallet_quantity}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Koli İçi Miktar</Form.Label>
                    <Form.Control
                        type="text"
                        name="box_quantity"
                        placeholder="Örn: 40,50"
                        value={product.box_quantity}
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
                                checked={product.categoryId.includes(cat.id)}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const isChecked = e.target.checked;

                                    setProduct((prev) => ({
                                        ...prev,
                                        categoryId: isChecked
                                            ? [...prev.categoryId, id] // seçili değilse ekle
                                            : prev.categoryId.filter((cId) => cId !== id), // seçiliyse çıkar
                                    }));
                                }}
                            />
                        ))}
                    </div>
                </Form.Group>

                <h5>Gizle</h5>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Gizli ürün"
                        name="hide"
                        checked={product.hide}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Kaydet
                </Button>
            </Form>
        </Container>
    );
};

export default ProductCreateForm;
