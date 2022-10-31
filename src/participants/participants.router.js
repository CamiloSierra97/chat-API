//? Dependencies
const router = require("express").Router();
const participantServices = require("./participants.services");

//? Protect routes
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/:conversation_id/participants")
  .get(
    passport.authenticate("jwt", { session: false }),
    participantServices.postParticipant
  )
  .post()
  .delete();

router
  .route("/:conversation_id/participants/:participant_id")
  .get()
  .post()
  .delete();

module.exports = router;
