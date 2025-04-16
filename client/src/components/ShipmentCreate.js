import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import alertify from "alertifyjs";

const ShipmentCreate = () => {
    const [form, setForm] = useState({
        shipment_type: "entry", // giriş varsayılan
        shipment_no: "",
        recipient: "",
        palletList: [],
    });

    const [pallets, setPallets] = useState([]);

    useEffect(() => {
        const getPallets = async () => {
            try {
                const { data } = await axios.get("/pallet");
                setPallets(data.data);
            } catch (error) {
                console.error("Paletler alınamadı:", error);
            }
        };
        getPallets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePalletToggle = (palletId) => {
        setForm(prev => {
            const updated = prev.palletList.includes(palletId)
                ? prev.palletList.filter(id => id !== palletId)
                : [...prev.palletList, palletId];
            return {
                ...prev,
                palletList: updated
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/shipment", {
                ...form,
                PalletList: form.palletList, // backend JSON olarak bekliyor
            });
            alertify.success("Sevkiyat başarıyla oluşturuldu.");
            setForm({
                shipment_type: "entry",
                shipment_no: "",
                recipient: "",
                palletList: []
            });
        } catch (error) {
            console.error("Sevkiyat oluşturma hatası:", error);
            alertify.error("Oluşturma başarısız.");
        }
    };

    return (
        <Container className="mt-4">
            <h3>Sevkiyat Oluştur</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Sevkiyat Türü</Form.Label>
                        <Form.Select name="shipment_type" value={form.shipment_type} onChange={handleChange}>
                            <option value="entry">Giriş</option>
                            <option value="exit">Çıkış</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Sevkiyat No</Form.Label>
                        <Form.Control
                            name="shipment_no"
                            value={form.shipment_no}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Alıcı</Form.Label>
                        <Form.Control
                            name="recipient"
                            value={form.recipient}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Paletler</Form.Label>
                    <div className="d-flex flex-wrap">
                        {pallets.map(pallet => (
                            <Form.Check
                                key={pallet.id}
                                type="checkbox"
                                label={`Palet: ${pallet.pallet_no} (${pallet.product_name})`}
                                checked={form.palletList.includes(pallet.id)}
                                onChange={() => handlePalletToggle(pallet.id)}
                                className="me-4 mb-2"
                            />
                        ))}
                    </div>
                </Form.Group>

                <Button type="submit" variant="primary">Oluştur</Button>
            </Form>
        </Container>
    );
};

export default ShipmentCreate;
