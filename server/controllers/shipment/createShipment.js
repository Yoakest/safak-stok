import Shipment from "../../models/shipment.js";
import createPalletFromShipment from "../pallet/createPalletFromShipment.js";
import Product from "../../models/product.js";
const createShipment = async (req, res) => {
    const {
        type,
        shipment_date,
        customer,
        pallet_list,
        total_pallet_list
    } = req.body;

    const lastShipmentNo = await Shipment.findOne({ order: [["no", "DESC"]] });
    const no = lastShipmentNo? lastShipmentNo + 1: 10000 ;

    const createdShipment = await Shipment.create({
        type,
        shipment_date,
        no,
        customer,
        pallet_list,
        total_pallet_list
    });

    for (const p of pallet_list) {
        await createPalletFromShipment(p);
    };

    for (const total of total_pallet_list) {
        const pId = total.productId;
        const qty = total.total_quantity;

        const product = await Product.findByPk(pId);
        const total_pallet = product.total_pallet_quantity;
        const total_product = product.total_product_quantity;


        if (type) {
            const new_total_pallet = total_pallet + total.pallets;
            const new_total_product = total_product + qty;
            await product.update({
                total_pallet_quantity: new_total_pallet,
                total_product_quantity: new_total_product
            });
        } else {
            const new_total_pallet = total_pallet - total.pallets;
            const new_total_product = total_product - qty;
            await product.update({
                total_pallet_quantity: new_total_pallet,
                total_product_quantity: new_total_product
            });
        };

        await createdShipment.addProduct(product);
    };
    return createdShipment;
};

export default createShipment;