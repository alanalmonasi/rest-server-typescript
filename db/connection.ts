import { Sequelize } from 'sequelize';

// Change 'user' and 'passsword' for your real user and password
const db = new Sequelize('node-ts', 'root', 'Sniffles1.', {
   host: 'localhost',
   dialect: 'mysql',
});

export default db;
