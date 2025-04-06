import Product from './product.js';
import Category from './category.js';
import Shipment from './shipment.js';
import Pallet from './pallet.js';

Product.belongsToMany(Category, { through: 'ProductCategory' }); Category.belongsToMany(Product, { through: 'ProductCategory' });

Shipment.belongsToMany(Product, { through: 'ProductShipment' });
Product.belongsToMany(Shipment, { through: 'ProductShipment' });

Product.hasMany(Pallet, { foreignKey: 'productId' });
Pallet.belongsTo(Product, { foreignKey: 'productId' });


export default {
    Product, Category, Shipment, Pallet
};