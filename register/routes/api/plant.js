const router = require("express").Router();
const plantController = require("../../controllers/plantController");


router.route("/")
  .post(plantController.create);


module.exports = router;
