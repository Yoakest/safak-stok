import Pallet from "../../models/pallet.js";
import Product from "../../models/product.js";
import relations from "../../models/relations.js";

const createPalletFromShipment = async (pallet) => {
    const createdPallet = await Pallet.create(pallet);
    return createdPallet;
};

export default createPalletFromShipment;