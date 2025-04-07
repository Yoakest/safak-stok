import Product from '../../models/product.js';
const updateProduct = async (req, res) => {
    const {
        id,
        name,
        code,
        brand,
        pallet_quantity,
        box_quantity,
        hide
    } = req.body;

    const update = await Product.update({
        name, code, brand, pallet_quantity, box_quantity, hide
    }, { where: { id } });
    return update;
};

export default updateProduct;