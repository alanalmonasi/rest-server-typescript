"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Change 'user' and 'passsword' for your real user and password
const db = new sequelize_1.Sequelize('node-ts', 'root', 'Sniffles1.', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=connection.js.map