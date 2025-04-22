import { body } from 'express-validator'
import Product from '../../models/product.js'

const createProductValidation = () => {
    return [
        body('name')
            .trim()
            .isLength({ min: 3 }).withMessage('Ürün adı en az 3 karakter olmalı.')
            .isLength({ max: 100 }).withMessage('Ürün adı en fazla 100 karakter olabilir.'),
        body('code')
            .trim()
            .isLength({ min: 3 }).withMessage('Ürün kodu 3 karakterden az olamaz.')
            .isLength({ max: 10 }).withMessage('Ürün kodu en fazla 10 karakter olabilir.')
            .custom(async (value) => {
                const existingProduct = await Product.findOne({ where: { code: value } });
                if (existingProduct) {
                    throw new Error('Bu ürün kodu zaten bulunuyor.')
                }
                return true;
            }),
        body('brand')
            .trim()
            .isLength({ max: 50 }).withMessage('Marka en fazla 50 karakter olabilir.'),
        body('pallet_quantity')
            .trim()
            .isLength({ max: 20 }).withMessage('Palet içi ürün miktarı en fazla 20 karakter olabilir'),
        body('box_quantity')
            .trim()
            .isLength({ max: 20 }).withMessage('Paket içi adet miktarı en fazla 20 karakter olabilir.'),
        body('hide')
            .optional()
            .toBoolean()
            .isBoolean().withMessage('Gizle değeri hatalı.')
    ]
}

export { createProductValidation }