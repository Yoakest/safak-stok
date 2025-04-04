const express = require('express');
const router = express.Router();
const productsRouter = require('./productRouters');
const getProduct = require('../controllers/product/getProducts')
const categoryRouter = require ('./categoryRouter')

router.use('/products', productsRouter);
router.use('/category', categoryRouter)

router.get('/', (req, res) => {
    console.log("test product11")
    getProduct(req, res);
    console.log("test product22")
});

module.exports = router;