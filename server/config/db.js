import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
import path from 'path';


dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

const createDatabaseIfNotExists = async () => {
    try {
        const sequelizeRoot = new Sequelize('', process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
        });
        const db = await sequelizeRoot.query('SHOW DATABASES');

        let hasDatabase = false;
        db[0].forEach(d => {
            if (d.Database === process.env.DB_NAME) {
                hasDatabase = true;
            }
        });
        if (hasDatabase) {
            console.log('Veritabanı zaten oluşturulmuş.');
        } else {
            await sequelizeRoot.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
            console.log(`✅ '${process.env.DB_NAME}' veritabanı oluşturuldu.`);
        }
    } catch (error) {
        console.error('❌ Veritabanı oluşturulurken hata oluştu:', error);
    }
};

const initializeDatabase = async () => {
    await createDatabaseIfNotExists(); // Veritabanını oluştur veya var olup olmadığını kontrol et
    try {
        await sequelize.authenticate();
        console.log('✅ Veritabanına başarıyla bağlanıldı.');

        // Modelleri içe aktar
        const models = await Promise.all([
            import('../models/product.js'),
            import('../models/category.js'),
            import('../models/shipment.js'),
            import('../models/pallet.js'),
            import('../models/relations.js'),
        ]);

        // Modelleri senkronize et
        await sequelize.sync({ force: true });
        console.log('✅ Veritabanı senkronizasyonu başarılı.');
    } catch (error) {
        console.error('❌ Veritabanı bağlantı hatası:', error);
    }

    // Default bir veri tabanı verileri oluşturuyorum.
    await Promise.all([
        import('../defaultdb.js')
    ]);
};

initializeDatabase();

export default sequelize;
