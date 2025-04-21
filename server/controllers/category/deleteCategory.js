import Category from "../../models/category.js";
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.destroy({ where: { id } });
        if (deleteCategory){
            return "Kategori silindi"
        }else{
            return
        }
        return true
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "İstenilen ürün bulunamadı."
        });
    };
};

export default deleteCategory; 