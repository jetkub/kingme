import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      wins
      losses
      totalGames
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      wins
      losses
      totalGames
      games {
        _id
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(_id: $id) {
      username
      email
      wins
      losses
      totalGames
    }
  }
`;

export const QUERY_GAMES = gql`
  query allGames {
    games {
      _id
      gameId
      gameName
      gameType
      gameStatus
      gameWinner
      gameLoser
      gameDate
      gameMoves
      players {
        _id
        username
        email
        wins
        losses
        totalGames
      }
      userTurn
      turnMessage
      boardState
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query singleGame($id: ID!) {
    game(_id: $id) {
      _id
      gameId
      gameName
      gameType
      gameStatus
      gameWinner
      gameLoser
      gameDate
      gameMoves
      players {
        _id
        username
        email
        wins
        losses
        totalGames
      }
      userTurn
      turnMessage
      boardState
    }
  }
`;

export const QUERY_GAME_BY_GAME_ID = gql`
  query gameByGameId($gameId: String!) {
    gameByGameId(gameId: $gameId) {
      _id
      gameId
      gameName
      gameType
      gameStatus
      gameWinner
      gameLoser
      gameDate
      gameMoves
      players {
        _id
        username
        email
        wins
        losses
        totalGames
      }
      userTurn
      turnMessage
      boardState
    } 
  }
`;
