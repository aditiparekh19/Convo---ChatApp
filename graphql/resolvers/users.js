const { users } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.json");
const { Op } = require("sequelize");
const saltRounds = 10;

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        const allUsers = await users.findAll({
          where: { username: { [Op.ne]: user.username } },
        });

        return allUsers;
      } catch (err) {
        throw err;
      }
    },
    login: async (parents, args, context, info) => {
      try {
        const { username, password } = args;
        let errors = {};
        if (username === "") {
          errors.username = `Username must not be empty`;
        }
        if (password === "") {
          errors.password = `Password must not be empty`;
        }
        if (Object.keys(errors).length > 0) {
          throw new UserInputError(`Bad input`, { errors });
        }
        const user = await users.findOne({ where: { username } });

        if (!user) {
          errors.username = "User not found";
          throw new UserInputError("User not found", { errors });
        }

        const correctPasswod = await bcrypt.compare(password, user.password);
        if (!correctPasswod) {
          errors.password = `Password is incorrect`;
          throw new UserInputError(`Password is incorrect`, { errors });
        }

        //Issue a token to the user
        const token = jwt.sign({ username }, JWT_SECRET, {
          expiresIn: 60 * 60,
        });

        user.token = token;
        return {
          ...user.toJSON(),
          createAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        throw new UserInputError("Bad Input", { errors: err });
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      //PACI
      try {
        let { username, email, password, confirmPassword } = args;
        let errors = {};
        // validate input

        if (username.trim() === "")
          errors.username = "Username must not be empty.";
        if (email.trim() === "") errors.email = "Email must not be empty.";
        if (password.trim() === "")
          errors.password = "Password must not be empty.";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "Repeat password must not be empty.";

        const existingUserName = await users.findOne({ where: { username } });
        const existingUserEmail = await users.findOne({ where: { email } });
        if (existingUserName) errors.username = "Username is taken.";
        if (existingUserEmail) errors.email = "Email is taken.";

        // match pass and confirmPass
        if (password && confirmPassword && password !== confirmPassword) {
          errors.confirmPassword = `Passwords must match.`;
        }

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        // encrypt the password
        password = await bcrypt.hash(password, saltRounds);

        // create the user
        const user = await users.create({ username, email, password });

        // return user
        return user;
      } catch (err) {
        throw new UserInputError("Bad Input", { errors: err });
      }
    },
  },
};

validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
