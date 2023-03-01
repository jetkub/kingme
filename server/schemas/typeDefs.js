const {gql} = require('apollo-server-express');


const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    wins: Int
    losses: Int
    draws: Int
    games: [Game]
}

type Game {
    _id: ID
    gameName: String
    gameType: String
    gameStatus: String
    gameWinner: String
    gameLoser: String
    gameDraw: String
    gameDate: String
    gameMoves: [String]
    gamePlayer1: String
    gamePlayer2: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    games: [Game]
    game(_id: ID!): Game
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}

`;

module.exports = typeDefs;
