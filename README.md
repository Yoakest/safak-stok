# Şafak Stok Takip Sistemi

Şuan üzerinde geliştirmeye devam ettiğim projem şuan daha tamamlanmadı yapılacak bazı işlemler kaldı.
Bu proje, bir işletmenin depo stoklarını takip edebilmesini sağlamak için geliştirilmiş tam kapsamlı bir **stok yönetim sistemidir**. Kullanıcılar ürün giriş/çıkış işlemlerini yönetebilir, stok miktarlarını görebilir ve palet bazlı takip yapabilir.

## 📸 Ekran Görüntüleri
Kategoriler
![Alt text](/screenshot/category.png?raw=true "Optional Title")
Ürünler
![Alt text](/screenshot/product.png?raw=true "Optional Title")
Ürün Oluştur
![Alt text](/screenshot/createProduct.png?raw=true "Optional Title")
Sevkiyatlar
![Alt text](/screenshot/shipmet.png?raw=true "Optional Title")
Gelen Sevkiyat
![Alt text](/screenshot/inboundShipment.png?raw=true "Optional Title")
Giden Sevkiyat
![Alt text](/screenshot/outBoundShipment.png?raw=true "Optional Title")
## 🚀 Özellikler

- Depo yönetimi
- Ürün/Kategori oluşturma ilişkilendirme işlemleri
- Sevkiyat işlemleri ile Ürün giri/çıkış, Palet ekleme/çıkarma işlemleri
- Ürün adedi ve Palet adedi bazlı stok takibi
- Gerçek zamanlı stok durumu
- Kullanıcı dostu arayüz EKLENMEYE DEVAM EDİYOR
- Kullanıcı rolleri (admin, kullanıcı vb.) EKLENECEK
- İşlemlerin doğruluğu için validatörler eklenecek, veriler kontrol edilecek. EKLENECEK
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
