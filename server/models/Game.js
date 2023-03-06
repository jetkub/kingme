const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        gameId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
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
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                // limit the number of players to 2
                max: 2
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


const Game = model('Game', gameSchema);


module.exports = Game;
