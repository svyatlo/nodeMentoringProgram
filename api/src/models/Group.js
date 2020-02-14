import { db } from '../config/database';

const { DataTypes } = require('sequelize');

export const Group = db.define('group', {
    group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    group_permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});
