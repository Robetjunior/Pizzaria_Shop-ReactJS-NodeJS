// src/models/index.js
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);

const Cliente = require("./client")(sequelize, Sequelize.DataTypes);

// Exportar os modelos e sequelize para uso em outras partes do projeto
module.exports = { sequelize, Cliente };
