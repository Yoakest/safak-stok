import express from 'express';
const router = express.Router();
import createShipment from '../controllers/shipment/createShipment.js';

router.get('/', async (req, res) => {
    res.status(200).json({ message: "Test" })
})

router.post('/', async (req, res) => {
    const data = createShipment(req, res);
    res.status(200).json({ status: "success", data });
});

export default router;