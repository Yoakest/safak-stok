import Pallet from "../../models/pallet.js";
const createPallet = async (req, res) => {
    const { quantity, location, productId } = req.body;
    const createdPallet = await Pallet.create({ quantity, location, productId });
    return createdPallet;
};

export default createPallet;