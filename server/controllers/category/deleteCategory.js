import Category from "../../models/category.js";
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const existingCategory = await Category.findOne({ where: { id } })
    if (existingCategory) {
        await Category.destroy({ where: { id } });
        return true;
    }
    else {
        return res.status(404).json({
            status: "error",
            message: "İstenilen ürün bulunamadı."
        })
    };
}

export default deleteCategory; 