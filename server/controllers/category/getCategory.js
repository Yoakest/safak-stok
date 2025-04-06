import Category from "../../models/category.js";
import Product from "../../models/product.js";
const getCategories = async (req, res) => {
    const { product } = req.query;
    if (product) {
        return await Category.findAll({
            include: Product
        })
    } else {
        console.log("aaaa");
        return await Category.findAll();
    }
}

const getCategoryById = async (req, res) => {
    const { product } = req.query;
    console.log(product);
    if (product) {
        console.log("222");
        return await Category.findByPk(req.params.id, { include: Product })
    } else {
        return await Category.findByPk(req.params.id)
    }
}

export default { getCategories, getCategoryById }