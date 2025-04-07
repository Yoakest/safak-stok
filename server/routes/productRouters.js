import express from 'express';
import createProduct from '../controllers/product/createProduct.js'
import { createProductValidator } from '../validations/product/productValidation.js';
import { validationResult } from 'express-validator';
import updateProduct from '../controllers/product/updateProduct.js';
import deleteProduct from '../controllers/product/deleteProduct.js';
import getProduct from '../controllers/product/getProduct.js';

const { getProduct, getProducts } = getProduct;
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.params.id) {
        const data = await getProduct(req, res);
        res.status(200).json({ status: "success", data });
    } else {
        const data = await getProducts(req, res);
        res.status(200).json({ status: "success", data });
    }
});

router.post('/', createProductValidator(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const data = await createProduct(req, res);
    res.status(201).json({ status: "success", data });
});

router.put('/', createProductValidator(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const data = await updateProduct(req, res)
    res.status(201).json({ status: "success", data })
})

router.delete('/', async (req, res) => {
    const data = await deleteProduct(req, res);
    return res.status(200).json({
        status: "success", data
    });
});

export default router;