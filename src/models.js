const { DataTypes } = require("sequelize");
const db = require("./db");
const sequelize = db.sequelize;

const KV = sequelize.define("KV", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { KV };
