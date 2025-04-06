import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pallet = sequelize.define('Pallet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING(50)
    }
},
    {
        timestamps: true
    }
);

export default Pallet;