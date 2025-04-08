import createCategory from './controllers/category/createCategory.js';
import createProduct from './controllers/product/createProduct.js';
import createShipment from './controllers/shipment/createShipment.js';

const defaultdb = async () => {
    const category = [{
        "name": "kategori1"
    }, {
        "name": "kategori2"
    }, {
        "name": "kategori3"
    }, {
        "name": "kategori4"
    },];

    const product = [
        {
            "name": "product1",
            "code": "prd1",
            "brand": "marka",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                1,
                2
            ],
            "hide": false
        }, {
            "name": "product2",
            "code": "prd2",
            "brand": "marka",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                1,
                3
            ],
            "hide": false
        }, {
            "name": "product4",
            "code": "prd4",
            "brand": "marka2",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                2,
                4
            ],
            "hide": false
        }, {
            "name": "product5",
            "code": "prd5",
            "brand": "marka4",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                2,
                4
            ],
            "hide": false
        }, {
            "name": "product6",
            "code": "prd6",
            "brand": "marka5",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                4,
                3
            ],
            "hide": false
        }, {
            "name": "product7",
            "code": "prd7",
            "brand": "marka4",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                1,
                2
            ],
            "hide": false
        }, {
            "name": "product8",
            "code": "prd8",
            "brand": "marka",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                2,
                4
            ],
            "hide": false
        }, {
            "name": "product9",
            "code": "prd9",
            "brand": "marka",
            "pallet_quantity": "400, 500",
            "box_quantity": "40,50",
            "categoryId": [
                3,
                4
            ],
            "hide": false
        },
    ];

    const shipment = [
        {
            "no": 2000,
            "type": true,
            "shipmet_date": new Date(),
            "customer": "Firma A",
            "pallet_list": [
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 1
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 1
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 1
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 1
                },
                {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 2
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 2
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 2
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 2
                }
            ],
            "total_pallet_list": [
                {
                    "productId": 1,
                    "total_quantity": 400,
                    "pallets": 4
                },
                {
                    "productId": 2,
                    "total_quantity": 200,
                    "pallets": 4
                }
            ]
        },
        {
            "no": 2001,
            "type": true,
            "shipmet_date": new Date(),
            "customer": "Firma B",
            "pallet_list": [
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 2
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 2
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 2
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 2
                },
                {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 3
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 3
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 3
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 3
                }
            ],
            "total_pallet_list": [
                {
                    "productId": 2,
                    "total_quantity": 400,
                    "pallets": 4
                },
                {
                    "productId": 3,
                    "total_quantity": 200,
                    "pallets": 4
                }
            ]
        },
        {
            "no": 2002,
            "type": true,
            "shipmet_date": new Date(),
            "customer": "Firma C",
            "pallet_list": [
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 3
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 3
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 3
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 3
                },
                {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 4
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 4
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 4
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 4
                }
            ],
            "total_pallet_list": [
                {
                    "productId": 3,
                    "total_quantity": 400,
                    "pallets": 4
                },
                {
                    "productId": 4,
                    "total_quantity": 200,
                    "pallets": 4
                }
            ]
        },
        {
            "no": 2003,
            "type": true,
            "shipmet_date": new Date(),
            "customer": "Firma D",
            "pallet_list": [
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 1
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 2
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 3
                },
                {
                    "location": "Pharmastar",
                    "quantity": 100,
                    "productId": 4
                },
                {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 1
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 2
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 3
                }, {
                    "location": "Pharmastar",
                    "quantity": 50,
                    "productId": 4
                }
            ],
            "total_pallet_list": [
                {
                    "productId": 1,
                    "total_quantity": 150,
                    "pallets": 2
                },
                {
                    "productId": 2,
                    "total_quantity": 150,
                    "pallets": 2
                },
                {
                    "productId": 3,
                    "total_quantity": 150,
                    "pallets": 2
                },
                {
                    "productId": 4,
                    "total_quantity": 150,
                    "pallets": 2
                }
            ]
        }
    ];

    for (const c of category) {
        const req = { body: c };
        const res = {};
        await createCategory(req, res);
    };

    for (const p of product) {
        const req = { body: p };
        const res = {};
        await createProduct(req, res);
    };

    for (const s of shipment) {
        const req = { body: s };
        const res = {};
        await createShipment(req, res);
    };
};

await defaultdb();

export default defaultdb;

