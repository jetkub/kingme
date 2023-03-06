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
  query singleGame($gameid: String!) {
    game(gameid: $gameid) {
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
