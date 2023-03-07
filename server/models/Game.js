const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        gameId: {
            type: String,
            unique: true,
            trim: true
        },
        gameName: {
            type: String,
            unique: true,
            trim: true
        },
        gameType: {
            type: String,
            unique: true,
            trim: true
        },
        gameStatus: {
            type: String,
            unique: true,
            trim: true
        },
        gameWinner: {
            type: String,
            unique: true,
            trim: true
        },
        gameLoser: {
            type: String,
            unique: true,
            trim: true
        },
        gameDate: {
            type: Date,
            default: Date.now
        },
        gameMoves: {
            type: String,
            unique: true,
            trim: true
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                // limit the number of players to 2
                max: 2
            }
        ],
        userTurn: {
            type: String,
            unique: true,
            trim: true
        },
        turnMessage: {
            type: String,
            unique: true,
            trim: true
        },
        boardState: {
            type: String,
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
