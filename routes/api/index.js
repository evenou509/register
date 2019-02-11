const router = require("express").Router();
const userRoutes = require("./users");
const plantRoutes = require("./plant");


// Book routes
router.use("/", userRoutes);

router.use("/", plantRoutes);

module.exports = router;
