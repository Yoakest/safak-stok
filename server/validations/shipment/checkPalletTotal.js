const checkPalletTotal = (pallet_list, total_pallet_list) => {
    const palletListTotal = {};

    for (const pallet of pallet_list) {
        const { productId, quantity } = pallet;

        if (!palletListTotal[productId]) {
            palletListTotal[productId] = {
                total_quantity: 0,
                pallets: 0
            };
        };

        palletListTotal[productId].total_quantity += quantity;
        palletListTotal[productId].pallets += 1;
    };


    for (const total of total_pallet_list) {
        const check = palletListTotal[total.productId];

        if (!check) {
            return new Error('Palet listesi ile Toplam Palet Listesi uyumsuz');
        };

        if (check.total_quantity !== total.total_quantity || check.pallets !== total.pallets) {
            return new Error('Palet Listesi ile Toplam Palet Listesi uyumsuz.');
        };
    }
    return true;
};

export default checkPalletTotal;