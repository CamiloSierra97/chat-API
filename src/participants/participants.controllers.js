//? Dependencies
const Participants = require("../models/participants.models");
const uuid = require("uuid");

const getAllParticipants = async () => {
  const data = await Participants.findAll();
  return data;
};

const postParticipant = async (data) => {
  const newParticipant = await Participants.create({
    id: uuid.v4(),
    conversationId: data.conversationId,
    userId: data.userId,
  });
  return newParticipant;
};

module.exports = {
  getAllParticipants,
  postParticipant,
};
