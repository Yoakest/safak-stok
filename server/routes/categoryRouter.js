const express = require('express');
const router = express.Router();
const { createCategoryValidator } = require('../validations/category/categoryValidation')

router.get('/', (req, res) => {
    res.json({ message: 'category!' });
});

router.post('/', createCategoryValidator(), (req, res) => {
    const { validationResult } = require('express-validator');

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: "test" });
}
);

module.exports = router;