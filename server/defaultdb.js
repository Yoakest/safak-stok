import createCategory from './controllers/category/createCategory.js';
import createProduct from './controllers/product/createProduct.js';
import createShipment from './controllers/shipment/createShipment.js';

const defaultdb = async () => {
    const category = [{
        "name": "kategori1
    }, {
        "name": "kategori2"
    }, {
        "name": "kategori3"
    }, {
        "name": "kategori4"
    },]

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
    ]

    const shipment = [
        {
            "no": 2000,
            "type": true,
            "shipmet_date": "07.04.2025",
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
                    "total_quantity": 400
                },
                {
                    "productId": 2,
                    "total_quantity": 200
                }
            ]
        },
        {
            "no": 2001,
            "type": true,
            "shipmet_date": "07.04.2025",
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
                    "total_quantity": 400
                },
                {
                    "productId": 3,
                    "total_quantity": 200
                }
            ]
        },
        {
            "no": 2002,
            "type": true,
            "shipmet_date": "07.04.2025",
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
                    "total_quantity": 400
                },
                {
                    "productId": 4,
                    "total_quantity": 200
                }
            ]
        },
        {
            "no": 2003,
            "type": true,
            "shipmet_date": "07.04.2025",
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
                    "total_quantity": 400
                },
                {
                    "productId": 2,
                    "total_quantity": 200
                }
            ]
        }
    ]

    for (c of category){
        
    }
}

