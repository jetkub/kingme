// Thinking Space

import { useState } from "react";

function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
    const [blackIsNext, setBlackIsNext] = useState(true);

    const [squares, setSquares] = useState(initialBoardLayout);

    function handleClick(i) {
        
    }

    return (
        <>
            <div>
                <Square value={squares[0]} />
                <Square value={squares[1]} />
                <Square value={squares[2]} />
                <Square value={squares[3]} />
                <Square value={squares[4]} />
                <Square value={squares[5]} />
                <Square value={squares[6]} />
                <Square value={squares[7]} />
            </div>
            <div>
                <Square value={squares[8]} />
                <Square value={squares[9]} />
                <Square value={squares[10]} />
                <Square value={squares[11]} />
                <Square value={squares[12]} />
                <Square value={squares[13]} />
                <Square value={squares[14]} />
                <Square value={squares[15]} />
            </div>
            <div>
                <Square value={squares[16]} />
                <Square value={squares[17]} />
                <Square value={squares[18]} />
                <Square value={squares[19]} />
                <Square value={squares[20]} />
                <Square value={squares[21]} />
                <Square value={squares[22]} />
                <Square value={squares[23]} />
            </div>
            <div>
                <Square value={squares[24]} />
                <Square value={squares[25]} />
                <Square value={squares[26]} />
                <Square value={squares[27]} />
                <Square value={squares[28]} />
                <Square value={squares[29]} />
                <Square value={squares[30]} />
                <Square value={squares[31]} />
            </div>
            <div>
                <Square value={squares[32]} />
                <Square value={squares[33]} />
                <Square value={squares[34]} />
                <Square value={squares[35]} />
                <Square value={squares[36]} />
                <Square value={squares[37]} />
                <Square value={squares[38]} />
                <Square value={squares[39]} />
            </div>
            <div>
                <Square value={squares[40]} />
                <Square value={squares[41]} />
                <Square value={squares[42]} />
                <Square value={squares[43]} />
                <Square value={squares[44]} />
                <Square value={squares[45]} />
                <Square value={squares[46]} />
                <Square value={squares[47]} />
            </div>
            <div>
                <Square value={squares[48]} />
                <Square value={squares[49]} />
                <Square value={squares[50]} />
                <Square value={squares[51]} />
                <Square value={squares[52]} />
                <Square value={squares[53]} />
                <Square value={squares[54]} />
                <Square value={squares[55]} />
            </div>
            <div>
                <Square value={squares[56]} />
                <Square value={squares[57]} />
                <Square value={squares[58]} />
                <Square value={squares[59]} />
                <Square value={squares[60]} />
                <Square value={squares[61]} />
                <Square value={squares[62]} />
                <Square value={squares[63]} />
            </div>
        </>
    )
}

// const pieceTypes = ['red', 'black', 'redKing', 'blackKing'];

// const redPieceArray = []

const initialBoardLayout = [null, 'black', null, 'black', null, 'black', null, 'black', 'black', null, 'black', null, 'black', null, 'black', null, null, 'black', null, 'black', null, 'black', null, 'black', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'red', null, 'red', null, 'red', null, 'red', null, null, 'red', null, 'red', null, 'red', null, 'red', 'red', null, 'red', null, 'red', null, 'red', null];
const initialRedCount = 12;
const initialBlackCount = 12;
let redCount;
let blackCount;

function movePiece() {

}

function calculateWinner() {
    if (redCount = 0) {
        return console.log('Red wins!')
    } else if (blackCount = 0) {
        return console.log('Black wins!')
    } else {
        return console.log('Next turn')
    }
}
