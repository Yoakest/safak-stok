import Product from '../../models/product.js';
const updateProduct = async (req, res) => {
    const {
        name,
        code,
        brand,
        pallet_quantity,
        box_quantity,
        hide
    } = req.body;

    const { id } =req.params;

    if (!id) {
        return 'Ürün ID bilgisi eksik.';
    }

    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) return 'Ürün bulunamadı.';


    const product = {};

    if (name) product.name = name;
    if (code) product.code = code;
    if (brand) product.brand = brand;
    if (pallet_quantity) product.pallet_quantity = pallet_quantity;
    if (box_quantity) product.box_quantity = box_quantity;
    if (hide) product.hide = hide;

    await Product.update(product, { where: { id } });
    const updatedProduct = await Product.findByPk(id);
    return updatedProduct;
};

export default updateProduct;