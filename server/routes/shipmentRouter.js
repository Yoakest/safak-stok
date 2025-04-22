import express from 'express';
const router = express.Router();
import createShipment from '../controllers/shipment/createShipment.js';
import createShipmentValidator from '../validations/shipment/shipmentValidation.js'
import getShipments from '../controllers/shipment/getShipment.js';


router.get('/', async (req, res) => {
    await getShipments(req, res);
})

router.post('/', createShipmentValidator(), async (req, res) => {
    const data = await createShipment(req, res); // <-- await eklendi
    res.status(200).json({ status: "success", data });
});


export default router;