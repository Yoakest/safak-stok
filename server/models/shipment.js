import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Shipment = sequelize.define('Shipment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.BOOLEAN,
    },
    shipment_date: {
        type: DataTypes.DATEONLY
    },
    no: {
        type: DataTypes.INTEGER,
        unique: true
    },
    customer: {
        type: DataTypes.STRING(100)
    },
    pallet_list: {
        type: DataTypes.JSON
    },
    total_pallet_list: {
        type: DataTypes.JSON
    }
},
    {
        timestamps: true,
    }
);

export default Shipment;