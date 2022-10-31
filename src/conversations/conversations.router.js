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

router
  .route("/:conversation_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getConversationById
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    conversationServices.updateConversation
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    conversationServices.deleteConversation
  );

router.route("/:conversation_id/participants").get().post().delete();

router
  .route("/:conversation_id/participants/:participant_id")
  .get()
  .post()
  .delete();

module.exports = router;
