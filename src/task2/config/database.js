const Sequelize = require('sequelize');

// const db = new Sequelize('nodeMP', 'postgres', '123456', {
//     host: 'localhost',
//     port: 5000,
//     dialect: 'postgres'
// });

const dialect = 'postgres';
const username = 'postgres';
const password = '123456';
const host = '127.0.0.1';
const port = 5000;
const database = 'nodeMP';

module.exports = new Sequelize('postgres://postgres:123456@127.0.0.1:5000/nodeMP');