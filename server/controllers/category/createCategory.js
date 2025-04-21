import Category from '../../models/category.js';
const createCategory = async (req, res) => {
    const { name } = req.body;
    const create = await Category.create(
        { name: name }
    );

    return create;
};

export default createCategory;