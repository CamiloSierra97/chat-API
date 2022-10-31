const conversationsControllers = require("./conversations.controllers");
//? Function to make creator as participant
const participantControllers = require("../participants/participants.controllers");

const getAllConversations = (req, res) => {
  conversationsControllers
    .getAllConversations()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getConversationById = (req, res) => {
  const conversationId = req.params.conversation_id;
  conversationsControllers
    .getConversationById(conversationId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const createConversation = (req, res) => {
  //? ID from logged User
  const userId = req.user.id;
  const { title, imageUrl } = req.body;
  if (title && userId) {
    conversationsControllers
      .createConversation({ title, imageUrl, userId })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } else {
    res.status(400).json({
      message: "Missing data",
      fields: {
        title: "string",
        imageUrl: "string (optional)",
        createdBy: "uuid",
      },
    });
  }
};

const updateConversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  const { title, imageUrl } = req.body;
  conversationsControllers
    .updateConversation(conversationId, { title, imageUrl })
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: `User with ID ${conversationId}, edited succesfully`,
        });
      } else {
        res.status(404).json({ message: "Invalid ID or missing data" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteConversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  conversationsControllers
    .deleteConversation(conversationId)
    .then((data) => {
      if (data !== 0) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllConversations,
  createConversation,
  getConversationById,
  updateConversation,
  deleteConversation,
};
