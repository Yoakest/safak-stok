import Product from '../../models/product.js';
import relations from '../../models/relations.js';
const createProduct = async (req, res) => {
    const {
        name, code, brand, pallet_quantity, box_quantity, categoryId, hide
    } = req.body;

    try {
        const create = await Product.create(
            {
                name,
                code,
                brand,
                pallet_quantity,
                box_quantity,
                hide
            }
        );

        if (categoryId && categoryId.length > 0) {
            await create.addCategories(categoryId);
        }
        return create.toJSON();

    } catch (error) {
        return error;
    };
};

export default createProduct;