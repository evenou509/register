const router = require("express").Router();
const userController = require("../../controllers/userController");

// route to sign up new user
router.route("/")
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/users")
  .get(userController.findAll)
//   .get(userController.findById)
  .put(userController.update);

module.exports = router;
