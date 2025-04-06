import { body } from 'express-validator';
import Category from '../../models/category.js';

const createCategoryValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Kategori adı boş olamaz.')
            .isLength({ min: 3 }).withMessage('Kategori adı en az 3 harf olmalı.')
            .isLength({ max: 50 }).withMessage('Kategori adı en fazla 50 karakter olabilir.')
            .custom(async (value) => {
                const existingCategoy = await Category.findOne({ where: { name: value } });

                if (existingCategoy) {
                    throw new Error("Bu kategori adı zaten mevcut.")
                }
                return true;
            })
    ];
}

export { createCategoryValidator }