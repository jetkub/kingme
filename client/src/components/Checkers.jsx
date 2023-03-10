import { useState } from 'react';
import Scoreboard from './Scoreboard'
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_WINS } from '../utils/mutation';
import { QUERY_ME } from "../utils/queries";
import { UPDATE_LOSSES } from '../utils/mutation';

export default function Board() {

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  // console.log(user);

  const [updateWins] = useMutation(UPDATE_WINS, {
      variables: { id: user._id }
    }
  );

  const [updateLosses] = useMutation(UPDATE_LOSSES, {
      variables: { id: user._id }
    }
  );


  let redCount = 0;
  let blackCount = 0;

  // blackIsNext tracks whether it is black's turn or red's turn
  const [blackIsNext, setBlackIsNext] = useState(true);
  
  // This is the starting board layout
  const [squares, setSquares] = useState([undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined]);
  
  // selectedPiece tracks which piece the payer has picked up so the same piece can be placed on the next click
  const [selectedPiece, setSelectedPiece] = useState(null);
  const savedPiece = ['🔴', '❤️', '⚫', '🖤']

  const statusMessage = [`${user.username}'s Turn`, "Red's Turn", `${user.username} Wins!`, "Red Wins!"]
  const [status, setStatus] = useState(statusMessage[0]);

  // ghostPosition tracks where the player picked up a piece from
  const [ghostPosition, setGhostPosition] = useState();
  
  // disableEndTurn tracks whether the endTurnButton is disabled or not
  const [disableEndTurn, setDisableEndTurn] = useState(true);

  // disablePieceClick tracks whether or not the pieces can be clicked
  const [disablePieceClick, setDisablePieceClick] = useState(false);

  // thereAreGhostPieces tracks whether or not there is a ghost piece on the board
  const [thereAreGhostPieces, setThereAreGhostPieces] = useState(false);

  // startTurnSquares tracks what the board looked like at the start of the turn
  const [startTurnSquares, setStartTurnSquares] = useState(squares);

  // aPieceWasJumped tracks whether or not a piece has been jumped this turn
  const [aPieceWasJumped, setAPieceWasJumped] = useState(false);
  
  // landedLocation tracks where a piece was placed
  const [landedLocation, setLandedLocation] = useState();

  function BlackSquare({ value, onSquareClick }) {
    return (
      <button className="blackSquare" onClick={onSquareClick} disabled={true}>
        {value}
      </button>
    );
  }
  
  function RedSquare({ value, onSquareClick }) {
    return (
      <button className="redSquare" onClick={onSquareClick} disabled={disablePieceClick}>
        {value}
      </button>
    );
  }
  
  function EndTurnButton({ onEndTurnClick }) {
    return (
      <button className="endBtn" onClick={onEndTurnClick} disabled={disableEndTurn}>
        End Turn
      </button>
    );
  }

  function handleClick(i) {
    const nextSquares = squares.slice();

    // This function sets the selectedPiece based on what piece is on the tile the user clicked
    function changeSelectedPiece() {
      if (nextSquares[i] === '🔴') {
        setSelectedPiece(savedPiece[0]);
      } else if (nextSquares[i] === '❤️') {
        setSelectedPiece(savedPiece[1]);
      } else if (nextSquares[i] === '⚫') {
        setSelectedPiece(savedPiece[2]);
      } else if (nextSquares[i] === '🖤') {
        setSelectedPiece(savedPiece[3]);
      } 
    }
    
    // This function tallies up the number of pieces of each color are on the board in order to determine if either side has been reduced to 0 pieces
    function tallyPieces() { 
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === '🔴') || nextSquares[index] === '❤️') {
          redCount ++;          
        } else if ((nextSquares[index] === '⚫') || nextSquares[index] === '🖤') {
          blackCount ++;          
        }
      }
      if ((redCount === 0) && blackIsNext) {
        setStatus(statusMessage[2]);
        updateWins();
        setDisableEndTurn(true);
      } else if ((blackCount === 0) && !blackIsNext) {
        setStatus(statusMessage[3]);
        updateLosses();
        setDisableEndTurn(true);
      }
    }

    // This function removes ghost pieces from the board
    function removeGhostPieces() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === '⚪') || (nextSquares[index] === '🤍')) {
          nextSquares[index] = null;
          // Allows the endTurnButton to function when there isn't a ghost piece on the board
          setDisableEndTurn(false);
          // Allows a new piece to be clicked
          setThereAreGhostPieces(false);
          // Resets ghostPosition so that the previous ghostPosition isn't a problem
          setGhostPosition(null);
        }
      }
    }

    // This function sets the location of the ghost piece based on which tile the player clicked to select which piece to move
    function getGhostPosition() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === '⚪') || (nextSquares[index] === '🤍')) {
          setGhostPosition(index);
          // Prevents the endTurnButton from functioning when there is a ghost piece on the board
          setDisableEndTurn(true);
        }
      }
    }

    // This function checks if there ae any ghost pieces on the board
    function checkForGhostPieces() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === '⚪') || (nextSquares[index] === '🤍')) {
          setThereAreGhostPieces(true);
          setDisableEndTurn(true);
        }
      }
    }

    // This function checks if all of the pieces are in the same position as they were at the start of the turn and prevents the endTurnButton from functioning if they are 
    function checkIfPositionMatches() {
      let matchingPositions = 0

      for (let index = 0; index < squares.length; index++) {
        if (startTurnSquares[index] === nextSquares[index]) {
          matchingPositions ++
            if (matchingPositions === 64) {
              setDisableEndTurn(true);
              // Reset the selectedPiece to null so a new piece can be picked up
              setSelectedPiece(null);
            } else {
              setDisableEndTurn(false);
              checkForGhostPieces();
            }
        }
      }
    }


    // TODO function displayMovementOptions() {}


    // This function determines which spaces the player is allowed to move their piece to based on where they are moving from and if there is an opponent piece to jump
    function movementRules() {
      // Single Black Piece Move Set
      // if (the player picked the piece up from B1 AND it is black's turn AND the piece the player picked up is a single black piece) then
      if ((ghostPosition === 1) && blackIsNext && (selectedPiece === '⚫')) {
        // if (A2 is empty AND the player clicks to place the piece in A2 AND no piece has been jumped this turn) then
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
          // set the selected destination (A2) to a single black piece
          nextSquares[i] = selectedPiece;
          // remove the ghostPiece from the board
          removeGhostPieces();
          // prevent the player from moving another piece this turn
          setDisablePieceClick(true);
        // else if (C2 is empty AND the player clicks to place the piece in C2 AND no piece has been jumped this turn) then
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
          // set the selected destination (C2) to a single black piece
          nextSquares[i] = selectedPiece;
          // remove the ghostPiece from the board
          removeGhostPieces();
          // prevent the player from moving another piece this turn
          setDisablePieceClick(true);
        // else if (D3 is empty AND C2 is occupied by a red piece (single or kinged) AND the player clicks to place the piece in D3) then
        } else if ((nextSquares[19] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 19)) {
          // set the selected destination (D3) to a single black piece
          nextSquares[i] = selectedPiece;
          // remove the red piece from the board
          nextSquares[10] = null;
          // remove the ghostPiece from the board
          removeGhostPieces();
          // record that a piece has been jumped this turn
          setAPieceWasJumped(true);
          // record where the piece was placed
          setLandedLocation(i);
        // else if (the player clicks to return their piece to where they picked it up from (B1)) then
        } else if (i === 1) {
          // set the original square (B1) back to a single black piece
          nextSquares[i] = selectedPiece;
          // allow the player to click on other pieces
          setThereAreGhostPieces(false);
        // else
        } else {
          // the move is invalid
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 3) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 17)) {
          nextSquares[i] = selectedPiece;
          nextSquares[10] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          nextSquares[12] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 3) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 5) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          nextSquares[12] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 23)) {
          nextSquares[i] = selectedPiece;
          nextSquares[14] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 5) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 7) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          nextSquares[14] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 7) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 8) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          nextSquares[17] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 8) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 10) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          nextSquares[17] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          nextSquares[19] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 10) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 12) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          nextSquares[19] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 30)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 12) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 14) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          nextSquares[21] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 14) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 17) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          nextSquares[26] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);     
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 33)) {
          nextSquares[i] = selectedPiece;
          nextSquares[26] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          nextSquares[28] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 19) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 21) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          nextSquares[28] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 39)) {
          nextSquares[i] = selectedPiece;
          nextSquares[30] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 21) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 23) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          nextSquares[30] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 23) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 24) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          nextSquares[33] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 24) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 26) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 40)) {
          nextSquares[i] = selectedPiece;
          nextSquares[33] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          nextSquares[35] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 26) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 28) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          nextSquares[35] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[46] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 46)) {
          nextSquares[i] = selectedPiece;
          nextSquares[37] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 28) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 30) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          nextSquares[37] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 30) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 33) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          nextSquares[42] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 33) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 35) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[49] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 49)) {
          nextSquares[i] = selectedPiece;
          nextSquares[42] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[53] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          nextSquares[44] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 35) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 37) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          nextSquares[44] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[55] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 55)) {
          nextSquares[i] = selectedPiece;
          nextSquares[46] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 37) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 39) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          nextSquares[46] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 39) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 40) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          nextSquares[49] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 40) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 42) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[56] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 56)) {
          nextSquares[i] = selectedPiece;
          nextSquares[49] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[60] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          nextSquares[51] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 42) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 44) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          nextSquares[51] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[62] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 62)) {
          nextSquares[i] = selectedPiece;
          nextSquares[53] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 44) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 46) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          nextSquares[53] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 46) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 49) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[56] === null) && (i === 56) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 49) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 51) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 51) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 53) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 53) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 55) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 55) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      
      // Kinged Black Piece Move Set
      if ((ghostPosition === 1) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 1) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 3) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 17)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 3) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 5) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 23)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 5) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 7) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 7) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 8) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 8) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 10) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 24)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 10) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 12) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 30)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 12) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 14) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[7] === null) && (i === 7) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 14) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 17) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 3)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 17) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[1] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 1)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[5] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 5)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 33)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 19) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 21) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 3)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[7] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 7)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 39)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 21) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 23) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 5)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 23) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 24) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 10)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 24) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 26) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[8] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 8)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[12] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 12)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 40)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 26) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 28) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 10)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[14] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 14)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[46] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 46)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 28) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 30) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 12)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 30) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 33) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 51)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 33) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 35) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 17)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[49] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 49)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[53] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 53)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 35) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 37) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 23)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 51)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[55] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 55)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 37) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 39) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 53)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 39) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 40) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 58)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 40) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 42) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 24)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[56] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 56)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[60] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 60)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 42) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 44) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 30)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 58)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[62] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 62)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 44) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 46) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 60)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 46) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 49) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[56] === null) && (i === 56) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 49) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 51) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 33)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 51) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 53) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 39)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 53) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 55) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 55) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 56) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 56) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 58) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 40)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 58) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 60) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[42] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if ((nextSquares[46] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 46)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if (i === 60) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
          } else {
            console.log('Invalid Move');
          }
      }
      if ((ghostPosition === 62) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[44] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if (i === 62) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
          } else {
            console.log('Invalid Move');
          }
      }

      // Single Red Piece Move Set
      if ((ghostPosition === 8) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 8) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 10) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 10) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 12) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 12) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 14) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[7] === null) && (i === 7) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if (i === 14) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 17) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 3)) {
          nextSquares[i] = selectedPiece;
          nextSquares[10] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[1] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 1)) {
          nextSquares[i] = selectedPiece;
          nextSquares[10] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[5] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 5)) {
          nextSquares[i] = selectedPiece;
          nextSquares[12] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 19) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 21) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 3)) {
          nextSquares[i] = selectedPiece;
          nextSquares[12] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[7] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 7)) {
          nextSquares[i] = selectedPiece;
          nextSquares[14] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 21) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 23) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 5) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          nextSquares[14] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 23) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 24) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 10)) {
          nextSquares[i] = selectedPiece;
          nextSquares[17] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 24) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 26) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[8] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 8)) {
          nextSquares[i] = selectedPiece;
          nextSquares[17] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[12] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 12)) {
          nextSquares[i] = selectedPiece;
          nextSquares[19] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 26) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 28) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 10)) {
          nextSquares[i] = selectedPiece;
          nextSquares[19] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[14] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 14)) {
          nextSquares[i] = selectedPiece;
          nextSquares[21] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 28) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 30) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 12)) {
          nextSquares[i] = selectedPiece;
          nextSquares[21] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 30) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 33) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          nextSquares[26] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 33) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 35) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 17)) {
          nextSquares[i] = selectedPiece;
          nextSquares[26] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          nextSquares[28] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 35) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 37) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          nextSquares[28] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 23)) {
          nextSquares[i] = selectedPiece;
          nextSquares[30] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 37) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 39) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          nextSquares[30] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 39) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 40) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          nextSquares[33] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 40) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 42) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          nextSquares[33] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          nextSquares[35] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 42) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 44) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          nextSquares[35] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 30)) {
          nextSquares[i] = selectedPiece;
          nextSquares[37] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 44) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 46) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          nextSquares[37] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 46) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 49) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          nextSquares[42] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 49) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 51) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 33)) {
          nextSquares[i] = selectedPiece;
          nextSquares[42] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          nextSquares[44] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 51) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 53) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          nextSquares[44] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 39)) {
          nextSquares[i] = selectedPiece;
          nextSquares[46] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 53) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 55) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          nextSquares[46] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 55) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 56) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          nextSquares[49] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 56) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 58) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 40)) {
          nextSquares[i] = selectedPiece;
          nextSquares[49] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          nextSquares[51] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 58) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 60) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          nextSquares[51] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if ((nextSquares[46] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 46)) {
          nextSquares[i] = selectedPiece;
          nextSquares[53] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 60) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 62) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
          setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          nextSquares[53] = null;
          removeGhostPieces();
          setAPieceWasJumped(true);
          setLandedLocation(i);
        } else if (i === 62) {
          nextSquares[i] = selectedPiece;
          setThereAreGhostPieces(false);
        } else {
          console.log('Invalid Move');
        }
      }

      // Kinged Red Piece Move Set
      if ((ghostPosition === 1) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 1) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 3) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 17)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 3) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 5) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 23)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 5) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 7) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 7) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 8) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 8) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 10) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[1] === null) && (i === 1) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 24)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 10) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 12) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[3] === null) && (i === 3) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 30)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 12) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 14) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[5] === null) && (i === 5) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[7] === null) && (i === 7) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 14) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 17) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[8] === null) && (i === 8) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 3)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 17) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[10] === null) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[1] === null) && ((nextSquares[10] === '⚫') || (nextSquares[10] === '🖤')) && (i === 1)) {
            nextSquares[i] = selectedPiece;
            nextSquares[10] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[5] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 5)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 33)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 19) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 21) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[12] === null) && (i === 12) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[3] === null) && ((nextSquares[12] === '⚫') || (nextSquares[12] === '🖤')) && (i === 3)) {
            nextSquares[i] = selectedPiece;
            nextSquares[12] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[7] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 7)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 39)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 21) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 23) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[14] === null) && (i === 14) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[5] === null) && ((nextSquares[14] === '⚫') || (nextSquares[14] === '🖤')) && (i === 5)) {
            nextSquares[i] = selectedPiece;
            nextSquares[14] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 23) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 24) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 10) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 24) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 26) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[17] === null) && (i === 17) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[8] === null) && ((nextSquares[17] === '⚫') || (nextSquares[17] === '🖤')) && (i === 8)) {
            nextSquares[i] = selectedPiece;
            nextSquares[17] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[12] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 12)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 40)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 26) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 28) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[19] === null) && (i === 19) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[10] === null) && ((nextSquares[19] === '⚫') || (nextSquares[19] === '🖤')) && (i === 10)) {
            nextSquares[i] = selectedPiece;
            nextSquares[19] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[14] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 14)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[46] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 46)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 28) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 30) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[21] === null) && (i === 21) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[23] === null) && (i === 23) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[12] === null) && ((nextSquares[21] === '⚫') || (nextSquares[21] === '🖤')) && (i === 12)) {
            nextSquares[i] = selectedPiece;
            nextSquares[21] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 30) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 33) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[24] === null) && (i === 24) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 51)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 33) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 35) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[26] === null) && (i === 26) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[17] === null) && ((nextSquares[26] === '⚫') || (nextSquares[26] === '🖤')) && (i === 17)) {
            nextSquares[i] = selectedPiece;
            nextSquares[26] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[21] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[49] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 49)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[53] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 53)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 35) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 37) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[28] === null) && (i === 28) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[19] === null) && ((nextSquares[28] === '⚫') || (nextSquares[28] === '🖤')) && (i === 19)) {
            nextSquares[i] = selectedPiece;
            nextSquares[28] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[23] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 23)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 51)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[55] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 55)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 37) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 39) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[30] === null) && (i === 30) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[21] === null) && ((nextSquares[30] === '⚫') || (nextSquares[30] === '🖤')) && (i === 21)) {
            nextSquares[i] = selectedPiece;
            nextSquares[30] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 53)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 39) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 40) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 58)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 40) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 42) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[33] === null) && (i === 33) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[24] === null) && ((nextSquares[33] === '⚫') || (nextSquares[33] === '🖤')) && (i === 24)) {
            nextSquares[i] = selectedPiece;
            nextSquares[33] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[28] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[56] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 56)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[60] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 60)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 42) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 44) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[35] === null) && (i === 35) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[26] === null) && ((nextSquares[35] === '⚫') || (nextSquares[35] === '🖤')) && (i === 26)) {
            nextSquares[i] = selectedPiece;
            nextSquares[35] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[30] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 30)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 58)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[62] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 62)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 44) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 46) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[37] === null) && (i === 37) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[39] === null) && (i === 39) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[28] === null) && ((nextSquares[37] === '⚫') || (nextSquares[37] === '🖤')) && (i === 28)) {
            nextSquares[i] = selectedPiece;
            nextSquares[37] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 60)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 46) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 49) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[40] === null) && (i === 40) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[56] === null) && (i === 56) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 49) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 51) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[42] === null) && (i === 42) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[33] === null) && ((nextSquares[42] === '⚫') || (nextSquares[42] === '🖤')) && (i === 33)) {
            nextSquares[i] = selectedPiece;
            nextSquares[42] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[37] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[58] === null) && (i === 58) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 51) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 53) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[44] === null) && (i === 44) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[35] === null) && ((nextSquares[44] === '⚫') || (nextSquares[44] === '🖤')) && (i === 35)) {
            nextSquares[i] = selectedPiece;
            nextSquares[44] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[39] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 39)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[60] === null) && (i === 60) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 53) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 55) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[46] === null) && (i === 46) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[37] === null) && ((nextSquares[46] === '⚫') || (nextSquares[46] === '🖤')) && (i === 37)) {
            nextSquares[i] = selectedPiece;
            nextSquares[46] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[62] === null) && (i === 62) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if (i === 55) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 56) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[42] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 56) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 58) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[49] === null) && (i === 49) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
        } else if ((nextSquares[40] === null) && ((nextSquares[49] === '⚫') || (nextSquares[49] === '🖤')) && (i === 40)) {
            nextSquares[i] = selectedPiece;
            nextSquares[49] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if ((nextSquares[44] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
        } else if (i === 58) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
        } else {
            console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 60) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[51] === null) && (i === 51) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[42] === null) && ((nextSquares[51] === '⚫') || (nextSquares[51] === '🖤')) && (i === 42)) {
            nextSquares[i] = selectedPiece;
            nextSquares[51] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if ((nextSquares[46] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 46)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if (i === 60) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
          } else {
            console.log('Invalid Move');
          }
      }
      if ((ghostPosition === 62) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[53] === null) && (i === 53) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[55] === null) && (i === 55) && (!aPieceWasJumped)) {
            nextSquares[i] = selectedPiece;
            removeGhostPieces();
            setDisablePieceClick(true);
          } else if ((nextSquares[44] === null) && ((nextSquares[53] === '⚫') || (nextSquares[53] === '🖤')) && (i === 44)) {
            nextSquares[i] = selectedPiece;
            nextSquares[53] = null;
            removeGhostPieces();
            setAPieceWasJumped(true);
            setLandedLocation(i);
          } else if (i === 62) {
            nextSquares[i] = selectedPiece;
            setThereAreGhostPieces(false);
          } else {
            console.log('Invalid Move');
          }
      }
    }

    
    // if (the tile clicked on is a single red piece AND it is red's turn AND there are no ghost pieces) then
    if ((nextSquares[i] === '🔴') && !blackIsNext && (thereAreGhostPieces === false)) {
      // if (a piece has already been moved this turn) then
      if (selectedPiece !== null) {
        // if (the tile clicked isn't where the piece moved this turn was placed) then
        if (i !== landedLocation) {
          // do nothing
          return;
        // else (if the tile clicked is where the piece moved this turn was placed)
        } else {
          // set the tile to display a single ghost piece
          nextSquares[i] = '⚪';
          // set the ghostPosition to the tile clicked
          getGhostPosition();
          // check if there are ghost pieces on the board
          checkForGhostPieces();
        }
      // else (if a piece hasn't already been moved this turn)
      } else {
        // set the selectedPiece to a single red piece
        changeSelectedPiece();
        // set the tile to display a single ghost piece
        nextSquares[i] = '⚪';
        // set the ghostPosition to the tile clicked
        getGhostPosition();
        // check if there are ghost pieces on the board
        checkForGhostPieces();
      }
    } else if ((nextSquares[i] === '❤️') && !blackIsNext && (thereAreGhostPieces === false)) {
      if (selectedPiece !== null) {
        if (i !== landedLocation) {
          return;
        } else {
          nextSquares[i] = '🤍';
          getGhostPosition();
          checkForGhostPieces();
        }
      } else {
        changeSelectedPiece();
        nextSquares[i] = '🤍';
        getGhostPosition();
        checkForGhostPieces();
      }
    } else if ((nextSquares[i] === '⚫') && blackIsNext && (thereAreGhostPieces === false)) {
      if (selectedPiece !== null) {
        if (i !== landedLocation) {
          return;
        } else {
          nextSquares[i] = '⚪';
          getGhostPosition();
          checkForGhostPieces();
        }
      } else {
        changeSelectedPiece();
        nextSquares[i] = '⚪';
        getGhostPosition();
        checkForGhostPieces();
      }
    } else if ((nextSquares[i] === '🖤') && blackIsNext && (thereAreGhostPieces === false)) {
      if (selectedPiece !== null) {
        if (i !== landedLocation) {
          return;
        } else {
          nextSquares[i] = '🤍';
          getGhostPosition();
          checkForGhostPieces();
        }
      } else {
        changeSelectedPiece();
        nextSquares[i] = '🤍';
        getGhostPosition();
        checkForGhostPieces();
      }
    // else if ((the tile clicked on is empty OR occupied by a ghost piece) AND it is black's turn) then
    } else if (((nextSquares[i] === null) || (nextSquares[i] === '⚪') || (nextSquares[i] === '🤍'))  && blackIsNext) {
      // check if a valid move was made and, if so, place the selectedPiece
      movementRules();
      // check if any pieces have moved from their starting positions
      checkIfPositionMatches();
      // if (tile A8 is a single black piece) then
      if (nextSquares[56] === '⚫') {
        // change it to a kinged black piece
        (nextSquares[56] = '🖤')
        // TODO Add 1 to black's kinged piece stat
      }
      if (nextSquares[58] === '⚫') {
        (nextSquares[58] = '🖤')
        // TODO Add 1 to black's kinged piece stat
      }
      if (nextSquares[60] === '⚫') {
        (nextSquares[60] = '🖤')
        // TODO Add 1 to black's kinged piece stat
      }
      if (nextSquares[62] === '⚫') {
        (nextSquares[62] = '🖤')
        // TODO Add 1 to black's kinged piece stat
      }
      // check if the game has been won
      tallyPieces();

      // OPTIONAL PLACE TO INTERECT WITH DATABASE FOR BOARD UPDATE

    // else if ((the tile clicked on is empty OR occupied by a ghost piece) AND it is red's turn) then
    } else if (((nextSquares[i] === null) || (nextSquares[i] === '⚪') || (nextSquares[i] === '🤍')) && !blackIsNext) {
      // check if a valid move was made and, if so, place the selectedPiece
      movementRules();
      // check if any pieces have moved from their starting positions
      checkIfPositionMatches();
      // if (tile B1 is a single red piece) then 
      if (nextSquares[1] === '🔴') {
        // change it to a kinged red piece
        (nextSquares[1] = '❤️')
        // TODO Add 1 to red's kinged piece stat
      }
      if (nextSquares[3] === '🔴') {
        (nextSquares[3] = '❤️')
        // TODO Add 1 to red's kinged piece stat
      }
      if (nextSquares[5] === '🔴') {
        (nextSquares[5] = '❤️')
        // TODO Add 1 to red's kinged piece stat
      }
      if (nextSquares[7] === '🔴') {
        (nextSquares[7] = '❤️')
        // TODO Add 1 to red's kinged piece stat
      }
      // check if the game has been won      
      tallyPieces();

      // OPTIONAL PLACE TO INTERECT WITH DATABASE FOR BOARD UPDATE

    }
    setSquares(nextSquares);

    // OPTIONAL PLACE TO INTERECT WITH DATABASE FOR BOARD UPDATE

  }

  // This function handles whether blackIsNext or not to determine whose turn it is
  function handleEndTurnClick() {
    setBlackIsNext(!blackIsNext);
    if (!blackIsNext) {
      setStatus(statusMessage[0])
    } else if (blackIsNext) {
      setStatus(statusMessage[1])
    }
    // disable the endTurnButton for the start of the next turn
    setDisableEndTurn(true);
    // allow pieces to be clicked for the start of the next turn
    setDisablePieceClick(false);
    // set startTurnSquares to the current board layout
    setStartTurnSquares(squares);
    // set aPieceWasJumped to false for the start of the next turn
    setAPieceWasJumped(false);
    // set selectedPiece to null for the start of the next turn
    setSelectedPiece(null);
  }

  return (
    <>
    <Scoreboard status={status}/>
    <div className="board">
      <div className="board-row">
        <BlackSquare value={squares[0]} onSquareClick={() => handleClick(0)} />
        <RedSquare value={squares[1]} onSquareClick={() => handleClick(1)} />
        <BlackSquare value={squares[2]} onSquareClick={() => handleClick(2)} />
        <RedSquare value={squares[3]} onSquareClick={() => handleClick(3)} />
        <BlackSquare value={squares[4]} onSquareClick={() => handleClick(4)} />
        <RedSquare value={squares[5]} onSquareClick={() => handleClick(5)} />
        <BlackSquare value={squares[6]} onSquareClick={() => handleClick(6)} />
        <RedSquare value={squares[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[8]} onSquareClick={() => handleClick(8)} />
        <BlackSquare value={squares[9]} onSquareClick={() => handleClick(9)} />
        <RedSquare value={squares[10]} onSquareClick={() => handleClick(10)} />
        <BlackSquare value={squares[11]} onSquareClick={() => handleClick(11)} />
        <RedSquare value={squares[12]} onSquareClick={() => handleClick(12)} />
        <BlackSquare value={squares[13]} onSquareClick={() => handleClick(13)} />
        <RedSquare value={squares[14]} onSquareClick={() => handleClick(14)} />
        <BlackSquare value={squares[15]} onSquareClick={() => handleClick(15)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[16]} onSquareClick={() => handleClick(16)} />
        <RedSquare value={squares[17]} onSquareClick={() => handleClick(17)} />
        <BlackSquare value={squares[18]} onSquareClick={() => handleClick(18)} />
        <RedSquare value={squares[19]} onSquareClick={() => handleClick(19)} />
        <BlackSquare value={squares[20]} onSquareClick={() => handleClick(20)} />
        <RedSquare value={squares[21]} onSquareClick={() => handleClick(21)} />
        <BlackSquare value={squares[22]} onSquareClick={() => handleClick(22)} />
        <RedSquare value={squares[23]} onSquareClick={() => handleClick(23)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[24]} onSquareClick={() => handleClick(24)} />
        <BlackSquare value={squares[25]} onSquareClick={() => handleClick(25)} />
        <RedSquare value={squares[26]} onSquareClick={() => handleClick(26)} />
        <BlackSquare value={squares[27]} onSquareClick={() => handleClick(27)} />
        <RedSquare value={squares[28]} onSquareClick={() => handleClick(28)} />
        <BlackSquare value={squares[29]} onSquareClick={() => handleClick(29)} />
        <RedSquare value={squares[30]} onSquareClick={() => handleClick(30)} />
        <BlackSquare value={squares[31]} onSquareClick={() => handleClick(31)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[32]} onSquareClick={() => handleClick(32)} />
        <RedSquare value={squares[33]} onSquareClick={() => handleClick(33)} />
        <BlackSquare value={squares[34]} onSquareClick={() => handleClick(34)} />
        <RedSquare value={squares[35]} onSquareClick={() => handleClick(35)} />
        <BlackSquare value={squares[36]} onSquareClick={() => handleClick(36)} />
        <RedSquare value={squares[37]} onSquareClick={() => handleClick(37)} />
        <BlackSquare value={squares[38]} onSquareClick={() => handleClick(38)} />
        <RedSquare value={squares[39]} onSquareClick={() => handleClick(39)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[40]} onSquareClick={() => handleClick(40)} />
        <BlackSquare value={squares[41]} onSquareClick={() => handleClick(41)} />
        <RedSquare value={squares[42]} onSquareClick={() => handleClick(42)} />
        <BlackSquare value={squares[43]} onSquareClick={() => handleClick(43)} />
        <RedSquare value={squares[44]} onSquareClick={() => handleClick(44)} />
        <BlackSquare value={squares[45]} onSquareClick={() => handleClick(45)} />
        <RedSquare value={squares[46]} onSquareClick={() => handleClick(46)} />
        <BlackSquare value={squares[47]} onSquareClick={() => handleClick(47)} />
      </div>
      <div className="board-row">
        <BlackSquare value={squares[48]} onSquareClick={() => handleClick(48)} />
        <RedSquare value={squares[49]} onSquareClick={() => handleClick(49)} />
        <BlackSquare value={squares[50]} onSquareClick={() => handleClick(50)} />
        <RedSquare value={squares[51]} onSquareClick={() => handleClick(51)} />
        <BlackSquare value={squares[52]} onSquareClick={() => handleClick(52)} />
        <RedSquare value={squares[53]} onSquareClick={() => handleClick(53)} />
        <BlackSquare value={squares[54]} onSquareClick={() => handleClick(54)} />
        <RedSquare value={squares[55]} onSquareClick={() => handleClick(55)} />
      </div>
      <div className="board-row">
        <RedSquare value={squares[56]} onSquareClick={() => handleClick(56)} />
        <BlackSquare value={squares[57]} onSquareClick={() => handleClick(57)} />
        <RedSquare value={squares[58]} onSquareClick={() => handleClick(58)} />
        <BlackSquare value={squares[59]} onSquareClick={() => handleClick(59)} />
        <RedSquare value={squares[60]} onSquareClick={() => handleClick(60)} />
        <BlackSquare value={squares[61]} onSquareClick={() => handleClick(61)} />
        <RedSquare value={squares[62]} onSquareClick={() => handleClick(62)} />
        <BlackSquare value={squares[63]} onSquareClick={() => handleClick(63)} />
      </div>
    </div>
    <EndTurnButton onEndTurnClick={handleEndTurnClick} />
    </>
  );
}
