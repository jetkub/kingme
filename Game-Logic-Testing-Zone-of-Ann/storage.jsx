import { useState } from 'react';

function BlackSquare({ value, onSquareClick }) {
  return (
    <button className="blackSquare" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function RedSquare({ value, onSquareClick }) {
  return (
    <button className="redSquare" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function EndTurnButton({ onEndTurnClick }) {
  return (
    <button onClick={onEndTurnClick}>
      End Turn
    </button>
  );
}

export default function Board() {
  let redCount = 0;
  let blackCount = 0;
  
  const [blackIsNext, setBlackIsNext] = useState(true);
  
  const [squares, setSquares] = useState([undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined]);
  
  const [selectedPiece, setSelectedPiece] = useState('⚫');
  const savedPiece = ['🔴', '❤️', '⚫', '🖤']

  const statusMessage = ["Black's Turn", "Red's Turn", "Black Wins!", "Red Wins!"]
  const [status, setStatus] = useState(statusMessage[0]);

  const [ghostPosition, setGhostPosition] = useState();

  function handleClick(i) {
    const nextSquares = squares.slice();

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
        // console.log('Black wins!');
        // Add 1 to Black Player's Win Stat
        // Add 1 to Red Player's Loss Stat
      } else if ((blackCount === 0) && !blackIsNext) {
        setStatus(statusMessage[3]);
        // console.log('Red wins!');
        // Add 1 to Red Player's Win Stat
        // Add 1 to Black Player's Loss Stat
      }
    }

    function removeGhostPieces() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === 'B') || (nextSquares[index] === 'R') || (nextSquares[index] === 'BK') || (nextSquares[index] === 'RK')) {
          nextSquares[index] = null;          
        }
      }
    }

    function getGhostPosition() {
      for (let index = 0; index < nextSquares.length; index++) {
        if ((nextSquares[index] === 'B') || (nextSquares[index] === 'R') || (nextSquares[index] === 'BK') || (nextSquares[index] === 'RK')) {
          setGhostPosition(index);
        }
      }
    }

    function movementRules() {
      // Single Black Piece Moveset
      if ((ghostPosition === 1) && blackIsNext && (selectedPiece === '⚫')) {
        // "B1" to ("A2" || ("C2" || "D3")
        if ((nextSquares[8] === null) && (i === 8)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[10] === null) && (i === 10)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[19] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 1) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 3) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[10] === null) && (i === 10)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[12] === null) && (i === 12)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[17] === null) && ((nextSquares[10] === '🔴') || (nextSquares[10] === '❤️')) && (i === 17)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[21] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 3) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 5) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[12] === null) && (i === 12)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[14] === null) && (i === 14)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[19] === null) && ((nextSquares[12] === '🔴') || (nextSquares[12] === '❤️')) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[23] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 23)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 5) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 7) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[14] === null) && (i === 14)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[21] === null) && ((nextSquares[14] === '🔴') || (nextSquares[14] === '❤️')) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 7) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 8) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[17] === null) && (i === 17)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 8) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 10) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[17] === null) && (i === 17)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[19] === null) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[24] === null) && ((nextSquares[17] === '🔴') || (nextSquares[17] === '❤️')) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[28] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 10) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 12) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[19] === null) && (i === 19)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[21] === null) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && ((nextSquares[19] === '🔴') || (nextSquares[19] === '❤️')) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[30] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 30)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 12) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 14) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[21] === null) && (i === 21)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[23] === null) && (i === 23)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[28] === null) && ((nextSquares[21] === '🔴') || (nextSquares[21] === '❤️')) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 14) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 17) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[24] === null) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[26] === null) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[28] === null) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[33] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 33)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[37] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 19) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 21) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[28] === null) && (i === 28)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[30] === null) && (i === 30)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && ((nextSquares[28] === '🔴') || (nextSquares[28] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[39] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 39)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 21) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 23) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[30] === null) && (i === 30)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[37] === null) && ((nextSquares[30] === '🔴') || (nextSquares[30] === '❤️')) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 23) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 24) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[33] === null) && (i === 33)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[42] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 24) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 26) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[33] === null) && (i === 33)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[40] === null) && ((nextSquares[33] === '🔴') || (nextSquares[33] === '❤️')) && (i === 40)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[44] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 26) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 28) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[35] === null) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[37] === null) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[42] === null) && ((nextSquares[35] === '🔴') || (nextSquares[35] === '❤️')) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[46] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 46)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 28) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 30) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[37] === null) && (i === 37)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[39] === null) && (i === 39)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[44] === null) && ((nextSquares[37] === '🔴') || (nextSquares[37] === '❤️')) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 30) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 33) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[40] === null) && (i === 40)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[42] === null) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[51] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 33) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 35) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[42] === null) && (i === 42)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[44] === null) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[49] === null) && ((nextSquares[42] === '🔴') || (nextSquares[42] === '❤️')) && (i === 49)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[53] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 35) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 37) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[44] === null) && (i === 44)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[46] === null) && (i === 46)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[51] === null) && ((nextSquares[44] === '🔴') || (nextSquares[44] === '❤️')) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[55] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 55)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 37) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 39) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[46] === null) && (i === 46)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[53] === null) && ((nextSquares[46] === '🔴') || (nextSquares[46] === '❤️')) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 39) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 40) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[49] === null) && (i === 49)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[58] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 40) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 42) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[49] === null) && (i === 49)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[51] === null) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[56] === null) && ((nextSquares[49] === '🔴') || (nextSquares[49] === '❤️')) && (i === 56)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[60] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 42) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 44) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[51] === null) && (i === 51)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[53] === null) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[58] === null) && ((nextSquares[51] === '🔴') || (nextSquares[51] === '❤️')) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[62] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 62)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 44) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 46) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[53] === null) && (i === 53)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[55] === null) && (i === 55)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[60] === null) && ((nextSquares[53] === '🔴') || (nextSquares[53] === '❤️')) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 46) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 49) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[56] === null) && (i === 56)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[58] === null) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 49) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 51) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[58] === null) && (i === 58)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[60] === null) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 51) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 53) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[60] === null) && (i === 60)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[62] === null) && (i === 62)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 53) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 55) && blackIsNext && (selectedPiece === '⚫')) {
        if ((nextSquares[62] === null) && (i === 62)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 55) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      // if ((ghostPosition === 56) && blackIsNext && (selectedPiece === '⚫')) {}
      // if ((ghostPosition === 58) && blackIsNext && (selectedPiece === '⚫')) {}
      // if ((ghostPosition === 60) && blackIsNext && (selectedPiece === '⚫')) {}
      // if ((ghostPosition === 62) && blackIsNext && (selectedPiece === '⚫')) {}

      // Kinged Black Piece Moveset
      if ((ghostPosition === 1) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 3) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 5) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 7) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 8) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 10) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 12) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 14) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 17) && blackIsNext && (selectedPiece === '🖤')) {
        if ((nextSquares[24] === null) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 21) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 23) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 24) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 26) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 28) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 30) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 33) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 35) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 37) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 39) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 40) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 42) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 44) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 46) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 49) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 51) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 53) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 55) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 56) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 58) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 60) && blackIsNext && (selectedPiece === '🖤')) {}
      if ((ghostPosition === 62) && blackIsNext && (selectedPiece === '🖤')) {}

      // Single Red Piece Moveset
      if ((ghostPosition === 1) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 3) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 5) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 7) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 8) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 10) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 12) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 14) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 17) && !blackIsNext && (selectedPiece === '🔴')) {
        if ((nextSquares[24] === null) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 21) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 23) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 24) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 26) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 28) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 30) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 33) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 35) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 37) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 39) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 40) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 42) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 44) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 46) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 49) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 51) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 53) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 55) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 56) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 58) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 60) && !blackIsNext && (selectedPiece === '🔴')) {}
      if ((ghostPosition === 62) && !blackIsNext && (selectedPiece === '🔴')) {}

      // Kinged Red Piece Moveset
      if ((ghostPosition === 1) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 3) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 5) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 7) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 8) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 10) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 12) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 14) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 17) && !blackIsNext && (selectedPiece === '❤️')) {
        if ((nextSquares[24] === null) && (i === 24)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[26] === null) && (i === 26)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if ((nextSquares[35] === null) && ((nextSquares[26] === '🔴') || (nextSquares[26] === '❤️')) && (i === 35)) {
          nextSquares[i] = selectedPiece;
          removeGhostPieces();
        } else if (i === 17) {
          nextSquares[i] = selectedPiece;
        } else {
          console.log('Invalid Move');
        }
      }
      if ((ghostPosition === 19) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 21) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 23) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 24) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 26) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 28) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 30) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 33) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 35) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 37) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 39) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 40) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 42) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 44) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 46) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 49) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 51) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 53) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 55) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 56) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 58) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 60) && !blackIsNext && (selectedPiece === '❤️')) {}
      if ((ghostPosition === 62) && !blackIsNext && (selectedPiece === '❤️')) {}
    }
  
    if ((nextSquares[i] === '🔴') && !blackIsNext) {
      changeSelectedPiece();
      nextSquares[i] = 'R';
      getGhostPosition();
      tallyPieces();
    } else if ((nextSquares[i] === '❤️') && !blackIsNext) {
      changeSelectedPiece();
      nextSquares[i] = 'RK';
      getGhostPosition();
      tallyPieces();
    } else if ((nextSquares[i] === '⚫') && blackIsNext) {
      changeSelectedPiece();
      nextSquares[i] = 'B';
      getGhostPosition();
      tallyPieces();
    } else if ((nextSquares[i] === '🖤') && blackIsNext) {
      changeSelectedPiece();
      nextSquares[i] = 'BK';
      getGhostPosition();
      tallyPieces();
    } else if ((nextSquares[i] === '🔴') || (nextSquares[i] === '❤️') || (nextSquares[i] === '⚫') || (nextSquares[i] === '🖤')) {
      changeSelectedPiece();
      nextSquares[i] = null;
      tallyPieces();
    } else if (((nextSquares[i] === null) || (nextSquares[i] === 'B') || (nextSquares[i] === 'BK'))  && blackIsNext) {
      // nextSquares[i] = selectedPiece;
      movementRules();
      // removeGhostPieces();
      if (nextSquares[56] === '⚫') {
        (nextSquares[56] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[58] === '⚫') {
        (nextSquares[58] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[60] === '⚫') {
        (nextSquares[60] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      if (nextSquares[62] === '⚫') {
        (nextSquares[62] = '🖤')
        // Add 1 to black's kinged piece stat
      }
      tallyPieces();
    } else if (((nextSquares[i] === null) || (nextSquares[i] === 'R') || (nextSquares[i] === 'RK')) && !blackIsNext) {
      nextSquares[i] = selectedPiece;
      removeGhostPieces();
      if (nextSquares[1] === '🔴') {
        (nextSquares[1] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[3] === '🔴') {
        (nextSquares[3] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[5] === '🔴') {
        (nextSquares[5] = '❤️')
        // Add 1 to red's kinged piece stat
      }
      if (nextSquares[7] === '🔴') {
        (nextSquares[7] = '❤️')
        // Add 1 to red's kinged piece stat
      }      
      tallyPieces();
    }
    setSquares(nextSquares);
  }

  function handleEndTurnClick() {
    setBlackIsNext(!blackIsNext);
    if (!blackIsNext) {
      setStatus(statusMessage[0])
    } else if (blackIsNext) {
      setStatus(statusMessage[1])
    }
  }

  return (
    <>
      <div className="status">{status}</div>

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

      <EndTurnButton onEndTurnClick={handleEndTurnClick} />
    </>
  );
}
