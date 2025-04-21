import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

let createdCategoryId;

describe("Kategori API Testleri", () => {
  it("Yeni kategori oluşturmalı", async () => {
    const response = await request(app)
      .post("/api/category")
      .send({ name: "TestKategori" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id");
    createdCategoryId = response.body.data.id;
  });

  it("Tüm kategorileri listelemeli", async () => {
    const response = await request(app).get("/api/category");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("Belirli bir kategoriyi getirmeli", async () => {
    const response = await request(app).get(`/api/category/${createdCategoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id", createdCategoryId);
  });

  it("Kategori güncelleme işlemi yapmalı", async () => {
    const response = await request(app)
      .put(`/api/category/${createdCategoryId}`)
      .send({ name: "GuncellenmisKategori" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.name).toBe("GuncellenmisKategori");
  });

  it("Kategori silmeli", async () => {
    const response = await request(app).delete(`/api/category/${createdCategoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });
});
