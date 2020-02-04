const { Sequelize } = require('sequelize');

export const db = new Sequelize('nodeMP', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// const sequelize = new Sequelize('postgres://postgres:123456@127.0.0.1:5432/nodeMP');
