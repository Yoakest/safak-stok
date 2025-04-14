import Product from "../../models/product.js";
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const existingProduct = await Product.findOne({ where: { id } });
    if (existingProduct) {
        await Product.destroy({ where: { id } });
        return;
    }
    else {
        return {
            status: "error",
            message: "İstenilen ürün bulunamadı."
        };
    };
}

export default deleteProduct;