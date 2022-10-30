const db = require("../utils/database");

const { DataTypes } = require("sequelize");

const Conversations = db.define("conversations", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Conversations;
