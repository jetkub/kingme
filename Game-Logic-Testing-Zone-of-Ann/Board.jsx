// Thinking Space

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

export default function Board() {
    let redCount = 0;
    let blackCount = 0;
  
    const [blackIsNext, setBlackIsNext] = useState(true);
  
    const [squares, setSquares] = useState([undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, undefined, '⚫', undefined, '⚫', undefined, '⚫', undefined, '⚫', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', '🔴', undefined, '🔴', undefined, '🔴', undefined, '🔴', undefined]);
  
    function handleClick(i) {
      const nextSquares = squares.slice();
  
      function tallyPieces() { 
        for (let index = 0; index < nextSquares.length; index++) {
          if (nextSquares[index] === '🔴') {
            redCount ++;          
          } else if (nextSquares[index] === '⚫') {
            blackCount ++;          
          }
        }
        console.log('redCount: ' + redCount);
        console.log('blackCount: ' + blackCount);
      }
  
      if ((nextSquares[i] === '🔴') || (nextSquares[i] === '⚫')) {
        nextSquares[i] = null;
        tallyPieces();
      } else if ((nextSquares[i] === null) && blackIsNext) {
        nextSquares[i] = '⚫';
        setBlackIsNext(!blackIsNext);
        tallyPieces();
      } else if ((nextSquares[i] === null) && !blackIsNext) {
        nextSquares[i] = '🔴';
        setBlackIsNext(!blackIsNext);
        tallyPieces();
      }
    
    setSquares(nextSquares);
  }

  let status = (blackIsNext ? "Black" : "Red") + "'s Turn";

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
    </>
  );
}


// For reference: The CSS from the tic-tac-toe
/*
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-left: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.blackSquare {
  background: black;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.redSquare {
  background: white;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
*/




// Vestigial Code

// const pieceTypes = ['🔴', '⚫', 'redKing', 'blackKing'];

// const redPieceArray = []

// const initialBoardLayout = [undefined, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, undefined, undefined, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, undefined, BlackPiece, null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, undefined, undefined, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, undefined, WhitePiece, undefined];
// const initialRedCount = 12;
// const initialBlackCount = 12;
// let redCount;
// let blackCount;

// function movePiece() {

// }

// function calculateWinner() {
//     if (redCount = 0) {
//         return console.log('Red wins!')
//     } else if (blackCount = 0) {
//         return console.log('Black wins!')
//     } else {
//         return console.log('Next turn')
//     }
// }
