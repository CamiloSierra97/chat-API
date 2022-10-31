const conversationsControllers = require("./conversations.controllers");

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
  const conversation_id = req.params.conversation_id;
  console.log(conversation_id);
  conversationsControllers
    .getConversationById(conversation_id)
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
  const conversation_id = req.params.conversation_id;
  const { title, imageUrl } = req.body;
  conversationsControllers
    .updateConversation(conversation_id, { title, imageUrl })
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: `User with ID ${conversation_id}, edited succesfully`,
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
  const conversation_id = req.params.conversation_id;
  conversationsControllers
    .deleteConversation(conversation_id)
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
