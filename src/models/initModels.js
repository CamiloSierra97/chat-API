//? Models
const Users = require("./users.models");
const Conversations = require("./conversations.models");
const Messages = require("./messages.models");
const Participants = require("./participants.models");

const initModels = () => {
  //? Relations between Users and Conversations
  Users.belongsToMany(Conversations, {
    through: Participants,
  });
  Conversations.belongsToMany(Users, {
    through: Participants,
  });

  //? Relations between Users and Messages
  Messages.belongsTo(Users);
  Users.hasMany(Messages);

  //? Relations between Conversations and Participants
  Participants.belongsTo(Conversations);
  Conversations.hasMany(Participants);

  //? Relations between Conversations and Messages
  Messages.belongsTo(Conversations);
  Conversations.hasMany(Messages);
};

module.exports = initModels;
