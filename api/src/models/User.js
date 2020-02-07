import { db } from '../config/database';

const { DataTypes } = require('sequelize');

export const User = db.define('user', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    user_login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_age: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    user_isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    scopes: {
        active: {
            where: {
                user_isDeleted: false
            }
        }
    }
});
