import express from "express";
import getAllPallets from "../controllers/pallet/getAllPallets.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await getAllPallets(req, res);
    res.status(200).json({ status: "success", data });
});

export default router;