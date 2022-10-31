const db = require("../utils/database");

const { DataTypes } = require("sequelize");
const Users = require("./users.models");
const Conversations = require("./conversations.models");

const Messages = db.define("messages", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "sender_id",
    references: {
      key: "id",
      model: Users,
    },
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "conversation_id",
    references: {
      key: "id",
      model: Conversations,
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Messages;
