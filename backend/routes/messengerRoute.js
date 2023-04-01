const router = require("express").Router();

const { getFriends } = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", getFriends);

module.exports = router;
