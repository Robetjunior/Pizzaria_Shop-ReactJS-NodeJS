// models/cliente.js
const { Model, DataTypes } = require("sequelize");

class Cliente extends Model {}

module.exports = (sequelize) => {
  Cliente.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.STRING,
    },
    { sequelize, modelName: "Cliente" }
  );

  return Cliente;
};
