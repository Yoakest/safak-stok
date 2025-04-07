import express from 'express';
import productsRouter from './productRouters.js';
import categoryRouter from './categoryRouter.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Test api"
    })
});

router.use('/product', productsRouter);
router.use('/category', categoryRouter)

export default router;