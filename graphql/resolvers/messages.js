const { Message, users } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getMessages: async (parent, { from }, { user }, info) => {
      try {
        if (!user) {
          throw new AuthenticationError("Unauthenticated");
        }
        const otherUser = await users.findOne({
          where: {
            username: from,
          },
          order: [["createdAt", "DESC"]],
        });
        if (!otherUser) {
          throw new UserInputError("User not found");
        }
        const usernames = [user.username, otherUser];
        const messages = await Message.findAll({
          from: { [Op.in]: usernames },
          to: { [Op.in]: usernames },
        });
        return messages;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user }, info) => {
      try {
        if (!user) {
          throw new AuthenticationError("Unauthenticated");
        }
        const recipient = await users.findOne({
          where: {
            username: to,
          },
        });
        if (!recipient) {
          throw new UserInputError("User not found");
        } else if (recipient.username === user.username) {
          throw new UserInputError("You can't message yourself");
        }
        if (content.trim() === "") {
          throw new UserInputError("Message is empty");
        }
        const message = await Message.create({
          to,
          from: user.username,
          content,
        });
        return message;
      } catch (err) {
        throw err;
      }
    },
  },
};

validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
