const { where } = require("sequelize");
const { users } = require("./models");
const { UserInputError } = require("apollo-server");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const allUsers = await users.findAll();
        return allUsers;
      } catch (err) {
        console.log(err);
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
          errors.email = "Username must not be empty.";
        if (email.trim() === "") errors.email = "Email must not be empty.";
        if (password.trim() === "")
          errors.email = "Password must not be empty.";
        if (confirmPassword.trim() === "")
          errors.email = "Repeat password must not be empty.";

        const existingUserName = await users.findOne({ where: { username } });
        const existingUserEmail = await users.findOne({ where: { email } });
        if (existingUserName) errors.username = "Username is taken.";
        if (existingUserEmail) errors.email = "Email is taken.";

        // match pass and confirmPass
        if (password && confirmPassword && password !== confirmPassword) {
          errors.email = `Passwords must match.`;
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
        throw new UserInputError("Bad Input", { errors : err });
      }
    },
  },
};

validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
