import Product from "../../models/product.js";
import Shipment from "../../models/shipment.js";

const getShipments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Shipment.findAndCountAll({
        limit,
        offset,
        order: [['shipment_date', 'DESC']],
        include: [
            { model: Product },
        ]
    });

    res.json({
        data: rows,
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
    });
};


export default getShipments;