const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Anime {
    animeId: ID
    title: String
    rated: String
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    animeCount: Int
    savedAnimes: [Anime]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveAnime(
      animeId: ID!
      title: String
      rated: String
      description: String
      image: String
      link: String
    ): User
    removeAnime(animeId: ID!): User
  }
`;

module.exports = typeDefs;
