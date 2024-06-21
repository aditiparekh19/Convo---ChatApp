const userResolvers = require("./users");
const messageResolvers = require("./messages");
const message = require("../../models/message");

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  User: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
};

validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
