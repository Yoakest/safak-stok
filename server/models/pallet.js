const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pallet = sequelize.define('Pallet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING(50)
    }
},
    {
        timestamps: true
    }
);

module.exports = Pallet;