import { Sequelize } from 'sequelize';

// Change 'user' and 'passsword' for your real user and password
const db = new Sequelize('node-ts', 'USER', 'PASSWORD', {
   host: 'localhost',
   dialect: 'mysql',
});

export default db;
