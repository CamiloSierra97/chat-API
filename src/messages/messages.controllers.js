const Messages = require("../models/messages.models");
const uuid = require("uuid");

const getMessages = async (conversationId) => {
  const data = await Messages.findAll({
    where: {
      conversationId,
    },
  });
  return data;
};

const createMessage = async (data) => {
  const newMessage = await Messages.create({
    id: uuid.v4(),
    senderId: data.userId,
    conversationId: data.conversationId,
    message: data.message,
  });
  return newMessage;
};

const getMessageById = async (messageId) => {
  const data = await Messages.findOne({
    where: {
      id: messageId,
    },
  });
  return data;
};

const deleteMessage = async (messageId) => {
  const data = await Messages.destroy({
    where: {
      id: messageId,
    },
  });
  return data;
};

module.exports = {
  getMessages,
  createMessage,
  getMessageById,
  deleteMessage,
};
