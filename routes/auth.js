const express = require("express");
const { register } = require("../controllers").auth;
const repos = require("../repositories");

const router = express.Router();

router.route("/register").post(register(repos));

module.exports = router;
