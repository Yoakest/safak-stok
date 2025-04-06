import express from 'express';
const router = express.Router();
import { createCategoryValidator } from '../validations/category/categoryValidation.js';
import { validationResult } from 'express-validator';
import getCategory from '../controllers/category/getCategory.js';
import createCategory from '../controllers/category/createCategory.js';
import updateCategory from '../controllers/category/updateCategory.js';
import deleteCategory from '../controllers/category/deleteCategory.js';

const { getCategoryById, getCategories } = getCategory;

router.get('/', async (req, res) => {
    const category = await getCategories(req, res);
    res.json({ data: category });
})

router.get('/:id', async (req, res) => {
        const category = await getCategoryById(req, res);
        res.json({ data: category });
 
});


router.post('/', createCategoryValidator(), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const created = await createCategory(req, res);
    return res.status(201).json({
        status: "success",
        data: created.name
    });
});

router.put('/', createCategoryValidator(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    await updateCategory(req, res);
    return res.status(201).json({ status: "success", data: req.body });
});

router.delete('/', async (req, res) => {
    const deleted = await deleteCategory(req, res);
    return res.status(201).json({
        status: "success",
        data: deleted
    });
});

export default router;