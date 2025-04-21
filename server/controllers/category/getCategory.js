import Category from "../../models/category.js";
import Product from "../../models/product.js";
const getCategories = async (req, res) => {
    const { product } = req.query;
    const options = {};

    if (product) {
        options.include = {
            model: Product
        };
    };

    const categoryList = await Category.findAll(options);

    res.status(200).json({
        success: "success",
        data: categoryList
    });
};



const getCategoryById = async (req, res) => {

    const { product } = req.query;
    const options = {};

    if (product) {
        options.include = {
            model: Product
        };
    };

    const categoryList = await Category.findByPk(req.params.id, options);

    res.status(200).json({
        success: "success",
        data: categoryList
    });
};

export default { getCategories, getCategoryById };