//? Dependencies
const router = require("express").Router();
const messageServices = require("./messages.services");

//? Protect routes
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/:conversation_id/messages")
  .get(
    passport.authenticate("jwt", { session: false }),
    messageServices.getMessages
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    messageServices.createMessage
  );

router
  .route("/:conversation_id/messages/:message_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    messageServices.getMessageById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    messageServices.deleteMessage
  );

module.exports = router;
