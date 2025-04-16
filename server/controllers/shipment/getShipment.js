import Product from "../../models/product.js";
import Shipment from "../../models/shipment.js";

const getShipments = async (req, res) => {
    return await Shipment.findAll({
        include: Product
    });
};

export default getShipments;