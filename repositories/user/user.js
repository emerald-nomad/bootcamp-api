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
};

module.exports = userRepo;
