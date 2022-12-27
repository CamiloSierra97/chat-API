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
    auth: {
      endpoint: "https://chatapi-mc74.onrender.com/api/v1/auth/",
      routes: [
        {
          path: "/login",
          verbs: ["post"],
          protected: false,
          adminValidate: false,
        },
        {
          path: "/register",
          verbs: ["post"],
          protected: false,
          adminValidate: false,
        },
      ],
    },
    users: {
      endpoint: "https://chatapi-mc74.onrender.com/api/v1/users",
      verbs: ["get"],
      protected: true,
      adminValidate: false,
      routes: [
        {
          path: "/me",
          verbs: ["get", "patch", "delete"],
          protected: true,
          adminValidate: false,
        },
        {
          path: "/:id",
          verbs: ["get", "patch", "delete"],
          protected: true,
          adminValidate: true,
          protectedVerbs: ["patch", "delete"],
        },
      ],
    },
    conversations: {
      endpoint: "https://chatapi-mc74.onrender.com/api/v1/conversations",
      verbs: ["get", "post"],
      protected: true,
      adminValidate: false,
      routes: [
        {
          path: "/:conversation_id",
          verbs: ["get", "patch", "delete"],
          protected: true,
          adminValidate: false,
        },
      ],
    },
    messages: {
      endpoint: "https://chatapi-mc74.onrender.com/api/v1/messages",
      routes: [
        {
          path: "/:conversation_id/messages",
          verbs: ["get", "post"],
          protected: true,
          adminValidate: false,
        },
        {
          path: "/:conversation_id/messages/:message_id",
          verbs: ["get", "delete"],
          protected: true,
          adminValidate: false,
        },
      ],
    },
    participants: {
      endpoint: "https://chatapi-mc74.onrender.com/api/v1/participants",
      routes: [
        {
          path: "/:conversation_id/participants",
          verbs: ["get", "post", "delete"],
          protected: true,
          adminValidate: false,
        },
        {
          path: "/:conversation_id/participants/:participant_id",
          verbs: ["get", "post", "delete"],
          protected: true,
          adminValidate: false,
        },
      ],
    },
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
