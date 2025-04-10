import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.min.css';
import CategoryList from "./CategoryList";
import axios from "../utils/axios.js";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [listKey, setListKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/category", { name: name });
      console.log(response);

      alertify.success("Kategori başarıyla oluşturuldu.");
      setName("");
      setListKey(prev => prev += 1);
    } catch (err) {
      alertify.error("Sunucu hatası.");
    }
  };

  return (
    <>
      <Container className="mt-5" style={{ maxWidth: "500px" }}>
        <h3>Kategori Oluştur</h3>

        <Form onSubmit={handleSubmit}>
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
      </Container>
      <CategoryList key={listKey} />
    </>
  );
};

export default CategoryForm;
