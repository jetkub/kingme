import { useState } from "react";

function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
    const [blackIsNext, setBlackIsNext] = useState(true);

    const [squares, setSquares] = useState(initialBoardLayout);


}

// const pieceTypes = ['red', 'black', 'redKing', 'blackKing'];

// const redPieceArray = []

const initialBoardLayout = [null, 'black', null, 'black', null, 'black', null, 'black', 'black', null, 'black', null, 'black', null, 'black', null, null, 'black', null, 'black', null, 'black', null, 'black', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'red', null, 'red', null, 'red', null, 'red', null, null, 'red', null, 'red', null, 'red', null, 'red', 'red', null, 'red', null, 'red', null, 'red', null]

function movePiece() {

}
