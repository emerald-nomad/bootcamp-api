/// <reference path="./auth.typedefs.js" />
const { User } = require("../../models");

/** @type {IAuthRepository} */
const authRepo = {
  registerUser: async (newUser) => {
    return User.create(newUser);
  },
};

module.exports = authRepo;
