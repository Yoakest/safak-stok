import Product from "../../models/product.js";
import Category from "../../models/category.js";

const getProducts = async (req, res) => {
    const { category } = req.query;
    if (category) {
        return await Product.findAll({
            include: Category
        });
    } else {
        return await Product.findAll();
    };
};

const getProductById = async (req, res) => {
    const { category } = req.query;
    if (category) {
        return await Product.findByPk(req.params.id, { include: Category });
    } else {
        return await Product.findByPk(req.params.id);
    };
};

export default { getProducts, getProductById }