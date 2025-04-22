import Category from '../../models/category.js';
const createCategory = async (req, res) => {
    const { name, order } = req.body;
    const create = await Category.create(
        { name, order }
    );

    return "Ürün oluşturuldu"
};

export default createCategory;