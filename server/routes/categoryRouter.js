import express from 'express';
const router = express.Router();
import { createCategoryValidator } from '../validations/category/categoryValidation.js';
import { validationResult } from 'express-validator';
import getCategory from '../controllers/category/getCategory.js';
import createCategory from '../controllers/category/createCategory.js';
import updateCategory from '../controllers/category/updateCategory.js';
import deleteCategory from '../controllers/category/deleteCategory.js';
import updateOrderCategory from '../controllers/category/updateOrderCategory.js';

const { getCategoryById, getCategories } = getCategory;


// Kategorileri listele
router.get('/', async (req, res) => {
    await getCategories(req, res);
});

// id'e göre kategori getir
router.get('/:id', async (req, res) => {
    await getCategoryById(req, res);
});

// Kategori oluştur
router.post('/', createCategoryValidator(), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const data = await createCategory(req, res);
    res.status(200).json(
        {
            status: "success",
            data
        });

});

// Kategori güncelle
router.put('/:id', createCategoryValidator(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    await updateCategory(req, res);
});

router.put('/order/:id', async (req, res) => {
    await updateOrderCategory(req, res);
});

router.delete('/:id', async (req, res) => {
    const deleted = await deleteCategory(req, res);
    return res.status(200).json({
        status: "success",
        data: deleted
    });
});



export default router;