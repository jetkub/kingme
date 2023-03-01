// Thinking space

import { useState } from "react";

let turnLayout;
let currentLayout;
let selectedPiece;

function getCurrentBoardLayout() {
    // Get the current board layout and piece positions, and this is set to currentLayout
}

function selectPiece() {
    // The user clicks on a piece, and it is set to the selectedPiece
    getCurrentBoardLayout();
}

function deselectPiece() {
    // The user clicks on the selectedPiece, and, if turnLayout === currentLayout, selectedPiece is set back to a non-selected piece
}

function selectDestination() {
    // The user clicks on a square where they want to move selected piece
}

function checkMove() {
    // 
}

function tallyPieces() {

}

function checkWinner() {

}

function kingMe() {

}

function endTurn() {
    const [blackIsNext, setBlackIsNext] = useState(true);
    setBlackIsNext(!blackIsNext);
}

function getTurnBoardLayout() {
    // Get the end/start of turn board layout and piece positions, and this is set to turnLayout
}

function playerTurn() {
    getTurnBoardLayout()
    selectPiece()
    selectDestination()
    checkMove()
    endTurn()
}
