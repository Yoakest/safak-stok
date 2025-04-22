import Category from "../../models/category.js";
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.destroy({ where: { id } });
        if (deletedCategory){
            return "Kategori silindi"
        }else{
            return "Kategori bulunamadı"
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "İstenilen ürün bulunamadı."
        });
    };
};

export default deleteCategory; 