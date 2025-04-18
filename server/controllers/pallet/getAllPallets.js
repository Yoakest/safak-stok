// controllers/pallet/getAllPallets.js
import Pallet from "../../models/pallet.js";
import Product from "../../models/product.js";

const getAllPallets = async (req, res) => {
    const pallets = await Pallet.findAll({
        include: [Product],
        order: [["createdAt", "DESC"]],
    });

    return pallets;
};

export default getAllPallets;
