const {gql} = require('apollo-server-express');


const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    totalGames: Int
    wins: Int
    losses: Int
    games: [Game]
}

type Game {
    _id: ID
    gameId: String
    gameName: String
    gameType: String
    gameStatus: String
    gameWinner: String
    gameLoser: String
    gameDate: String
    gameMoves: [String]
    players: [User]
    userTurn: String
    turnMessage: String
    boardState: String
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
    game(gameid: String): Game
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateWins(_id: ID!): User
    updateLosses(_id: ID!): User
    addGame( _id:ID! ): Game
    addPlayerToGame( _id:ID!, gameId: String! ): Game
    deleteGame( _id:ID! ): Game

}
`;

module.exports = typeDefs;
