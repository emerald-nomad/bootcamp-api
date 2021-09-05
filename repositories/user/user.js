/// <reference path="./user.typedefs.js" />
const { User } = require("../../models");

/** @type {IUserRepository} */
const userRepo = {
  getUser: async (email, select = "") => {
    return User.findOne({ email }).select(select);
  },
};

module.exports = userRepo;
