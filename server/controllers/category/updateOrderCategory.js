import Category from '../../models/category.js';
// controllers/category/updateOrder.js
const updateOrderCategory = async (req, res) => {
    const { id } = req.params;

    const current = await Category.findByPk(id);
    if (!current) return res.status(404).json({ error: "Kategori bulunamadı" });

    const other = await Category.findOne({
        where: {
            order: current.order + 1 
        }
    });

    if (!other) return res.status(400).json({ error: "Sıra değiştirilemedi" });

    // Order değerlerini takas et
    const temp = current.order;
    current.order = other.order;
    other.order = temp;

    await current.save();
    await other.save();

    res.json({ status: "success" });
};

export default updateOrderCategory;