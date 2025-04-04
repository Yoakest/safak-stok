const Product = require('./product');
const Category = require('./category');
const Shipment = require ('./shipment');
const Pallet = require ('./pallet')

Product.belongsToMany(Category, {through: 'ProductCategory'});Category.belongsToMany(Product, {through: 'ProductCategory'});

Shipment.belongsToMany(Product, {through: 'ProductShipment'});
Product.belongsToMany(Shipment, {through: 'ProductShipment'});

Product.hasMany(Pallet, {foreignKey: 'productId'});
Pallet.belongsTo(Product, {foreignKey: 'proudctıd'});


module.exports = {
    Product, Category, Shipment, Pallet
};