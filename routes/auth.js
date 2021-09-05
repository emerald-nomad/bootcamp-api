const express = require("express");
const { register, login } = require("../controllers").auth;
const repos = require("../repositories");

const router = express.Router();

router.route("/register").post(register(repos));

router.route("/login").post(login(repos));

module.exports = router;
