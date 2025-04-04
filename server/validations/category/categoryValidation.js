const { body } = require('express-validator');

const createCategoryValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Kategori adı boş olamaz.')
            .isLength({ min: 3 }).withMessage('Kategori adı en az 3 harf olmalı.')
            .isLength({ max: 50 }).withMessage('Kategori adı en fazla 50 karakter olabilir.')
    ];
}

module.exports = {
    createCategoryValidator
}