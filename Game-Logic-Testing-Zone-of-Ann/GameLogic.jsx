// Thinking space

import { useState } from "react";

const initialRedCount = 12;
const initialBlackCount = 12;

let turnLayout;
let currentLayout;
let selectedPiece;
let currentLocation;
let winner;
let redCount;
let blackCount;

function startGame() {
    redCount = initialRedCount;
    blackCount = initialBlackCount;
}

function endGame() {
    
}

function getCurrentBoardLayout() {
    // Get the current board layout and piece positions, and this is set to currentLayout
}

function selectPiece() {
    // The user clicks on a piece, and it is set to the selectedPiece
        // selectedPiece color is set to 'Black' or 'Red' depending on blackIsNext
    getCurrentBoardLayout();
}

function deselectPiece() {
    // The user clicks on the selectedPiece, and, if turnLayout === currentLayout, selectedPiece is set back to a non-selected piece
}

function selectDestination() {
    // The user clicks on a square where they want to move selected piece
}

function checkMove() {
    // Check if selected space is a viable move in moveList of selectedPiece's currentLocation
    // Check if selected space is empty

    // If (viable move && empty space) {
        // Check if selected space is a jump
            // If selected space is a jump
                jumpPiece();
                // Check if the game has been won
                    tallyPieces();
                    checkWinner();
                    // If game has been won
                        declareWinner();
                    // Else if game has not been won and another jump is available
                        // User's turn continues
                    // Else if game has not been won and another jump is not available
                        // All moves are invalid
                        // Wait for user to end turn
                            endTurn();
        // Check if selected space is a kingMe space
            // If selected space is a kingMe space
                kingMe();
                // All moves are invalid
                // Wait for user to end turn
                    endTurn();
    // }
}

function jumpPiece() {
    // Remove opponent's piece from the board
        // If (user is 'Black') {
            // redCount -= 1
        // } else {
            // blackCount -= 1
        // }
}

function tallyPieces() {
    // Check how many black pieces and red pieces are on the board
}

function checkWinner() {
    tallyPieces()
    // If 'Red' piece count is at 0
        // Set winner to 'Black'
    // Else if 'Black' piece count is at 0
        // Set winner to 'Red'
    // Else
        // Game continues
}

function kingMe() {
    // The selectedPiece is replaced with either blackKing or redKing depending on if selectedPiece is 'Black' or 'Red'
}

function endTurn() {
    // Save the layout of the board
        getTurnBoardLayout()
    // Switch turn between 'Red' and 'Black' 
        const [blackIsNext, setBlackIsNext] = useState(true);
        setBlackIsNext(!blackIsNext);
        // Only pieces of one color can be selected based on blackIsNext
}

function getTurnBoardLayout() {
    // Get the end/start of turn board layout and piece positions, and this is set to turnLayout
}

function declareWinner() {
    // Display the winner
}

function playerTurn() {
    getTurnBoardLayout()
    selectPiece()
    selectDestination()
    checkMove()
    endTurn()
}
