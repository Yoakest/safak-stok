import Product from "../../models/product.js";
import Category from "../../models/category.js";
import Pallet from "../../models/pallet.js";

const getProducts = async (req, res) => {
    const { category, pallet } = req.query;
    if (category) {
        return await Product.findAll({
            include: Category
        });
    }
    else if (pallet) {
        return await Product.findAll({
            include: Pallet
        })
    }
    else {
        return await Product.findAll();
    };
};

const getProductById = async (req, res) => {
    const { category, pallet } = req.query;
    if (category) {
        return await Product.findByPk(req.params.id, { include: Category });
    } else if (pallet) {
        return await Product.findByPk(req.params.id, {
            include: Pallet
        });
    } else {
        return await Product.findByPk(req.params.id);
    };
};

export default { getProducts, getProductById }