# Şafak Stok Takip Sistemi

Bu proje, bir işletmenin depo stoklarını takip edebilmesini sağlamak için geliştirilmiş tam kapsamlı bir **stok yönetim sistemidir**. Kullanıcılar ürün giriş/çıkış işlemlerini yönetebilir, stok miktarlarını görebilir ve palet bazlı takip yapabilir.

## 📸 Ekran Görüntüleri

## 🚀 Özellikler

- Depo yönetimi
- Ürün/Kategori oluşturma ilişkilendirme işlemleri
- Sevkiyat işlemleri ile Ürün giri/çıkış, Palet ekleme/çıkarma işlemleri
- Ürün adedi ve Palet adedi bazlı stok takibi
- Gerçek zamanlı stok durumu
- Kullanıcı dostu arayüz EKLENMEYE DEVAM EDİYOR
- Kullanıcı rolleri (admin, kullanıcı vb.) EKLENECEK

---

## 🛠️ Kullanılan Teknolojiler

### Frontend

- React.js
- Bootstrap, React-Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- Sequelize
- dotenv
- express-validator
- cors

### Veritabanı

- MySQL

## ⚙️ Kurulum

Projeyi kendi bilgisayarında çalıştırmak için aşağıdaki adımları izleyebilirsin:

### 1. Depoyu klonla

```bash
git clone https://github.com/Yoakest/safak-stok.git
cd safak-stok
```

Frontend için;

```bash
cd client
npm install
npm start
```

Backend için;
Veritabanı bağlantısı için MySQL bilgilerinizi 
./server/.env
klasöründe güncelleryiniz. 

```bash
cd server
npm install
node app
```