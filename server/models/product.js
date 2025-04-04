const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING(50),
    },
    pallet_quantity: {
        type: DataTypes.STRING(20),
    },
    box_quantity: {
        type: DataTypes.STRING(20),
    },
    total_product_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_pallet_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        timestamps: true,
    }
);

module.exports = Product;