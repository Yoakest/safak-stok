const { Sequelize } = require('sequelize');
require('dotenv').config();

// Veritabanına bağlanmak için bağlantı bilgileri
// En üst ve dışarıda tanımlanma sebebi uygulama ilk çalıştığında bağlantı hatası almamak için
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

// Veritabanını kontrol edip oluştur
const createDatabaseIfNotExists = async () => {
    try {
        // Veritabanı oluşturmak için bağlantı bilgileri (DB_NAME olmadan bağlanıyoruz)
        const sequelizeRoot = new Sequelize('', process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
        });
        const db = await sequelizeRoot.query(`show databases`)

        // Database daha önce oluşturulmuşmu kontrol ediliyor.
        var hasDatabse = false;
        db[0].forEach(d => {
            if (d.Database == process.env.DB_NAME){
                hasDatabse = true;
            }
        });
        if (hasDatabse){
            console.log("Veri tabanı zaten oluşturulmuş.")
        }else{
            await sequelizeRoot.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
            console.log(`✅ '${process.env.DB_NAME}' veritabanı bulunamadı, oluşturuldu.`);
        };

    } catch (error) {
        console.error("❌ Veritabanı oluşturulurken hata oluştu:", error);
    }
};

const initializeDatabase = async () => {
    await createDatabaseIfNotExists(); // Eğer veritabanı yoksa oluştur
    try {

        await sequelize.authenticate();
        console.log('✅ Veritabanına başarıyla bağlanıldı.');

        // Senkronize edilmesini istediğimiz modelleri ekle
        const Product = require("../models/product");
        const Category = require ("../models/category");
        const Shipment = require ('../models/shipment');
        const Pallet = require ('../models/pallet');
        const relations = require ("../models/relations");

        // Tüm modelleri senkronize et
        await sequelize.sync({ force: true });
        console.log('✅ Veritabanı senkronizasyonu başarılı.');

    } catch (error) {
        console.error('❌ Veritabanı bağlantı hatası:', error);
    }
};

initializeDatabase();

module.exports = sequelize;