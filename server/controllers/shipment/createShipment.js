import Shipment from "../../models/shipment.js";
import createPalletFromShipment from "../pallet/createPalletFromShipment.js";
const createShipment = async (req, res) => {
    const {
        type,
        shipment_date,
        no,
        customer,
        pallet_list,
        total_pallet_list
    } = req.body;
    const createdShipment = await Shipment.create({
        type,
        shipment_date,
        no,
        customer,
        pallet_list,
        total_pallet_list
    });
    
    for (const p of pallet_list) {
        await createPalletFromShipment(p);
    }


    return createdShipment;
}

export default createShipment;