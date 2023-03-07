const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongodb');

const newObjectId = () => new ObjectId().toHexString();


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('games')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('games');
        },
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.findOne(params).select('-__v -password').populate('games');
    }, 
        games: async () => {
            return Game.find()
                .select('-__v')
                .populate('players');
        },
        game: async (parent, { gameId }) => {
            const params = gameId ? { gameId } : {};
            return Game.findOne(params).select('-__v').populate('players');
        },
},
    Mutation: {
        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
},

        updateWins: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $inc: { wins: 1, totalGames: 1 } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },

        updateLosses: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $inc: { losses: 1, totalGames: 1 } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
        // add game then add player to game
        addGame: async (parent, args, context) => {
            if (context.user) {
                const game = await Game.create({...args, 
                    _id: newObjectId(),
                    players: context.user._id,
                    userTurn: context.user.username,
                    turnMessage: `${context.user.username}'s turn`,
                    boardState: `${context.user.username}'s board state`,
                    gameId: Math.random().toString(36).substr(2, 9),
                    gameName: `${context.user.username}'s game`,
                    gameType: `${context.user.username}'s single/multiplayer`,
                    gameStatus: `${context.user.username}'s in progress`,
                    gameWinner: `${context.user.username}'s Game winner`,
                    gameLoser: `${context.user.username}'s Game loser`,
                    gameDate: new Date().toLocaleString(),
                });
                // update the games array in the user model
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { games: game._id } },
                    { new: true }
                );
            
                 console.log(context.user);

                return game, user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

            addPlayerToGame: async (parent, { _id, gameId }, context) => {
                if (context.user) {
                    const updatedGame = await Game.findOneAndUpdate(
                        { gameId: gameId },
                        { $push: { players: context.user._id } 
                        },
                        { new: true }
                    );
                    // update the games array in the user model
                    const user = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { games: updatedGame._id } },
                        { new: true }
                    );
                    return updatedGame;
                }
        },

        // delete game and remove game from users games array
        deleteGame: async (parent, { _id }, context) => {
                if (context.user) {
                    const deletedGame = await Game.findByIdAndDelete({ _id });
                    const user = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $pull: { games: _id } },
                        { new: true }
                    );
                    return deletedGame, user;
                }
                throw new AuthenticationError('You need to be logged in!');
        },

    }



    };


module.exports = resolvers;

