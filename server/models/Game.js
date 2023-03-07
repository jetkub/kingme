const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        gameId: {
            type: String,
            unique: true,
            trim: true
        },
        gameName: {
            type: String,
            unique: false,
            trim: true
        },
        gameType: {
            type: String,
            unique: false,
            trim: true
        },
        gameStatus: {
            type: String,
            unique: false,
            trim: true
        },
        gameWinner: {
            type: String,
            unique: false,
            trim: true
        },
        gameLoser: {
            type: String,
            unique: false,
            trim: true
        },
        gameDate: {
            type: Date,
            default: Date.now
        },
        gameMoves: {
            type: String,
            unique: false,
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
            unique: false,
            trim: true
        },
        turnMessage: {
            type: String,
            unique: false,
            trim: true
        },
        boardState: {
            type: String,
            unique: false,
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
