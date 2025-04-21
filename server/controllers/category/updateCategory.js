import Category from '../../models/category.js';
const updateCategory = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const update = await Category.update({ name }, { where: { id } });

    res.status(200).json({
        status: "success",
        data: update
    })
};

export default updateCategory;