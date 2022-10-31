//? Dependencies
const Conversations = require("../models/conversations.models");
const uuid = require("uuid");

const getAllConversations = async () => {
  const data = await Conversations.findAll();
  return data;
};

const getConversationById = async (conversationId) => {
  const data = await Conversations.findOne({
    where: {
      id: conversationId,
    },
  });
  return data;
};

const createConversation = async (data) => {
  const newConversation = await Conversations.create({
    id: uuid.v4(),
    title: data.title,
    imageUrl: data.imageUrl,
    createdBy: data.userId,
  });
  return newConversation;
};

const updateConversation = async (conversationId, data) => {
  const result = await Conversations.update(data, {
    where: {
      id: conversationId,
    },
  });
  return result;
};

const deleteConversation = async (conversationId) => {
  const data = await Conversations.destroy({
    where: {
      id: conversationId,
    },
  });
  return data;
};



module.exports = {
  getAllConversations,
  createConversation,
  getConversationById,
  updateConversation,
  deleteConversation,
};
