import express from 'express';
import createProduct from '../controllers/product/createProduct.js'
import { createProductValidation } from '../validations/product/createProductValidation.js';
import { updateProductValidation } from '../validations/product/productUpdateValidation.js'
import { validationResult } from 'express-validator';
import updateProduct from '../controllers/product/updateProduct.js';
import deleteProduct from '../controllers/product/deleteProduct.js';
import getProduct from '../controllers/product/getProduct.js';

const { getProductById, getProducts } = getProduct;
const router = express.Router();

router.get('/', async (req, res) => {
    const data = await getProducts(req, res);
    res.status(200).json({ status: "success", data });
});

router.get('/:id', async (req, res) => {
    const data = await getProductById(req, res);
    res.status(200).json({ status: "success", data });
})

router.post('/', createProductValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const data = await createProduct(req, res);
    res.status(201).json({ status: "success", data });
});

router.put('/:id', updateProductValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const data = await updateProduct(req, res)
    res.status(201).json({ status: "success", data })
})

router.delete('/:id', async (req, res) => {
    const data = await deleteProduct(req, res);
    return res.status(200).json({
        status: "success", data
    });
});

export default router;