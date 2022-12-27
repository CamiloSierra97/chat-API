//? Dependencies
const express = require("express");
const db = require("./utils/database");

//? Files
const config = require("./config");
const initModels = require("./models/initModels");

//? Routes
const usersRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const conversationsRouter = require("./conversations/conversations.router");
const messagesRouter = require("./messages/messages.router");

//? Seeders functions
const createUsers = require("./utils/seeders/users");
// const createConversations = require("./utils/seeders/conversations");
// const createMessages = require("./utils/seeders/messages");
// const createParitipants = require("./utils/seeders/participants");

//? Initial Configs
const app = express();

app.use(express.json());

db.authenticate()
  .then(() => {
    console.log("Database autenticated");
  })
  .catch((err) => {
    console.log(err);
  });

db.sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

initModels();

//? Petitions

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server OK!",
    users: `https://chatapi-mc74.onrender.com/api/v1/users`,
    conversations: `https://chatapi-mc74.onrender.com/api/v1/conversations`,
    messages: `https://chatapi-mc74.onrender.com/api/v1/messages`,
    participants: `https://chatapi-mc74.onrender.com/api/v1/participants`,
  });
});

//? Verbs
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/conversations", conversationsRouter);
app.use("/api/v1/messages", messagesRouter);

app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`);
});

//? Seeders execution
createUsers(db);
// createConversations(db);
// createMessages(db);
// createParitipants(db);
