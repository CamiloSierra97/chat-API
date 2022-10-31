const messageControllers = require("./messages.controllers");

const getMessages = (req, res) => {
  const conversationId = req.params.conversation_id;
  messageControllers
    .getMessages(conversationId)
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

const getMessageById = (req, res) => {
  const messageId = req.params.message_id;
  messageControllers
    .getMessageById(messageId)
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

const createMessage = (req, res) => {
  const conversationId = req.params.conversation_id;
  const userId = req.user.id;
  const { message } = req.body;
  if (message) {
    messageControllers
      .createMessage({ userId, conversationId, message })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing data",
      fields: {
        message: "string",
      },
    });
  }
};

const deleteMessage = (req, res) => {
  const messageId = req.params.message_id;
  messageControllers
    .deleteMessage(messageId)
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
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage,
};
