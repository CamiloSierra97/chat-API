//? Dependencies
const router = require("express").Router();
const conversationServices = require("./conversations.services");

//? Protect routes
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/") //? /api/v1/conversations
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getAllConversations
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    conversationServices.createConversation
  );

module.exports = router;
