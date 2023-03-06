import {gql} from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const UPDATE_WINS = gql`
    mutation updateWins($id: ID!) {
        updateWins(_id: $id) {
            _id
            wins
        }
    }
`;

export const UPDATE_LOSSES = gql`
    mutation updateLosses($id: ID!) {
        updateLosses(_id: $id) {
            _id
            losses
        }
    }
`;



