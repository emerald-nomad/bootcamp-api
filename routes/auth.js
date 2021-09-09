const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword } =
  require("../controllers").auth;
const repos = require("../repositories");
const { protect } = require("../middleware");

const router = express.Router();

router.route("/register").post(register(repos));

router.route("/login").post(login(repos));

router.route("/me").get(protect, getMe(repos));

router.route("/forgotpassword").post(forgotPassword(repos));

router.route("/resetpassword/:resetToken").put(resetPassword(repos));

module.exports = router;
