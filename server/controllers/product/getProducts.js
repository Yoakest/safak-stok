const getProduct = async (req, res) => {
    const parameters = req.body;
    if (parameters) {
        res.status(200).json({ parameters })
    } else {
        res.status(200).json({ parameters: "Paramatre yok" })
    }
}

export default getProduct;