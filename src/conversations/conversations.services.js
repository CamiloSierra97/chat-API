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

module.exports = {
  getAllConversations,
  createConversation,
};
