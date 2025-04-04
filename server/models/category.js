const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        uniqe:true
    },

},
    {
        timestamps: true,
    }
);

module.exports = Category;