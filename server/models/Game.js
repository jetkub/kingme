const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        gameName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameType: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameStatus: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameWinner: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameLoser: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameDraw: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gameDate: {
            type: Date,
            default: Date.now
        },
        gameMoves: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gamePlayer1: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        gamePlayer2: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


const Game = model('Game', gameSchema);


module.exports = Game;
