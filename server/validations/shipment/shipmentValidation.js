import { body } from 'express-validator';
import Product from '../../models/product.js';
import checkPalletTotal from './checkPalletTotal.js';

const createShipmentValidator = () => {
    return [
        body('no')
            .isInt().withMessage("Sevkiyat no sayı olmalı"),
        body('type')
            .isBoolean().withMessage("Sevkiyat tipi boolean olmalı"),
        body('shipment_date')
            .isDate().withMessage('Sevkiyat tarihi geçerli bir tarih olmalı'),
        body('customer')
            .isLength({ max: 100 }).withMessage('Müşteri adı en fazla 100 karakter olabilir.'),
        body()
            .custom(({ pallet_list, total_pallet_list }) => {
                return checkPalletTotal(pallet_list, total_pallet_list);
            })
    ];
};

export default createShipmentValidator;