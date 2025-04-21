import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.min.css';
import CategoryList from "./CategoryList";
import axios from "../utils/axios.js";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [listKey, setListKey] = useState("");

  // Kategori oluştur
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/category", { name: name }).then((data) => {
        if (data.data.status === "success") {
          alertify.success(`"${data.data.data}" oluşturuldu.`);
        } else {
          alertify.error("Sunucu hatası oluştu")
        };
      });

      setName("");
      setListKey(prev => prev += 1);
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach((e) => {
          alertify.error(e.msg);
        })
      }else{
        alertify.error("Sunucu hatası oluştu");
      };
    };
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
