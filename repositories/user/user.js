/// <reference path="./user.typedefs.js" />
const { User } = require("../../models");

/** @type {IUserRepository} */
const userRepo = {
  getUserByEmail: async (email, select = "") => {
    return User.findOne({ email }).select(select);
  },

  getUserById: async (id) => {
    return User.findById(id);
  },

  getUserByResetToken: async (resetToken) => {
    return User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  },

  registerUser: async (newUser) => {
    return User.create(newUser);
  },
};

module.exports = userRepo;
