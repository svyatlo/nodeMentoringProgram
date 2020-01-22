const Sequelize = require('sequelize');
import sequelize from '../config/database';
const Model = Sequelize.Model;

class User extends Model {}

User.init({
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, { sequelize });

module.exports = User;
