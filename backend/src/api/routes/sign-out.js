const express = require("express");
const signOutController = require("../controllers/sign-outController");
const { authenticateJWT } = require("../../middlewares/authenticate-jwt");

const router = express.Router();

router.post("/sign-out", authenticateJWT, signOutController.signOut);

module.exports = router;
