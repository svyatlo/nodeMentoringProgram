import { db } from '../config/database';

const { DataTypes } = require('sequelize');

export const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.UUID
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    scopes: {
        active: {
            where: {
                isDeleted: false
            }
        }
    }
});
