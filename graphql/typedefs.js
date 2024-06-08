module.exports = `#graphql

 type User {
  username: String!
  email: String!
  token: String
  createdAt: String!
}

type Message {
  uuid: ID!
  content: String!
  to: String!
  from: String!
  createdAt: String!
}

type Query {
  getUsers: [User]!
  login(username: String!, password: String!): User!
  getMessages(from: String!): [Message]!
}

type Mutation {
  registerUser(username: String!, email: String!, password: String!, confirmPassword: String!) : User!
  sendMessage(to: String!, content: String!): Message!
}
`;
