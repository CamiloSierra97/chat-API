//? Dependencies
const Conversations = require("../models/conversations.models");
const uuid = require("uuid");

const getAllConversations = async () => {
  const data = await Conversations.findAll();
  return data
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

module.exports = {
  getAllConversations,
  createConversation,
};
