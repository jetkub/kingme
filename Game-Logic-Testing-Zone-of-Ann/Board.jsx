// Thinking Space

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
    let redCount = 0;
    let blackCount = 0;
  
    const [blackIsNext, setBlackIsNext] = useState(true);
  
    const [squares, setSquares] = useState([undefined, 'black', undefined, 'black', undefined, 'black', undefined, 'black', 'black', undefined, 'black', undefined, 'black', undefined, 'black', undefined, undefined, 'black', undefined, 'black', undefined, 'black', undefined, 'black', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, 'red', undefined, 'red', undefined, 'red', undefined, 'red', undefined, undefined, 'red', undefined, 'red', undefined, 'red', undefined, 'red', 'red', undefined, 'red', undefined, 'red', undefined, 'red', undefined]);
  
    function handleClick(i) {
      const nextSquares = squares.slice();
  
      function tallyPieces() {
        
        for (let index = 0; index < nextSquares.length; index++) {
          if (nextSquares[index] === 'red') {
            redCount ++;          
          } else if (nextSquares[index] === 'black') {
            blackCount ++;          
          }
        }
        console.log('redCount: ' + redCount);
        console.log('blackCount: ' + blackCount);
      }
  
      if ((nextSquares[i] === 'red') || (nextSquares[i] === 'black')) {
        nextSquares[i] = null;
        tallyPieces();
      } else if ((nextSquares[i] === null) && blackIsNext) {
        nextSquares[i] = 'black';
        setBlackIsNext(!blackIsNext);
        tallyPieces();
      } else if ((nextSquares[i] === null) && !blackIsNext) {
        nextSquares[i] = 'red';
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
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      </div>
      <div className="board-row">
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
      </div>
      <div className="board-row">
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
      </div>
      <div className="board-row">
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
        <Square value={squares[25]} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} onSquareClick={() => handleClick(27)} />
        <Square value={squares[28]} onSquareClick={() => handleClick(28)} />
        <Square value={squares[29]} onSquareClick={() => handleClick(29)} />
        <Square value={squares[30]} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} onSquareClick={() => handleClick(31)} />
      </div>
      <div className="board-row">
        <Square value={squares[32]} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} onSquareClick={() => handleClick(33)} />
        <Square value={squares[34]} onSquareClick={() => handleClick(34)} />
        <Square value={squares[35]} onSquareClick={() => handleClick(35)} />
        <Square value={squares[36]} onSquareClick={() => handleClick(36)} />
        <Square value={squares[37]} onSquareClick={() => handleClick(37)} />
        <Square value={squares[38]} onSquareClick={() => handleClick(38)} />
        <Square value={squares[39]} onSquareClick={() => handleClick(39)} />
      </div>
      <div className="board-row">
        <Square value={squares[40]} onSquareClick={() => handleClick(40)} />
        <Square value={squares[41]} onSquareClick={() => handleClick(41)} />
        <Square value={squares[42]} onSquareClick={() => handleClick(42)} />
        <Square value={squares[43]} onSquareClick={() => handleClick(43)} />
        <Square value={squares[44]} onSquareClick={() => handleClick(44)} />
        <Square value={squares[45]} onSquareClick={() => handleClick(45)} />
        <Square value={squares[46]} onSquareClick={() => handleClick(46)} />
        <Square value={squares[47]} onSquareClick={() => handleClick(47)} />
      </div>
      <div className="board-row">
        <Square value={squares[48]} onSquareClick={() => handleClick(48)} />
        <Square value={squares[49]} onSquareClick={() => handleClick(49)} />
        <Square value={squares[50]} onSquareClick={() => handleClick(50)} />
        <Square value={squares[51]} onSquareClick={() => handleClick(51)} />
        <Square value={squares[52]} onSquareClick={() => handleClick(52)} />
        <Square value={squares[53]} onSquareClick={() => handleClick(53)} />
        <Square value={squares[54]} onSquareClick={() => handleClick(54)} />
        <Square value={squares[55]} onSquareClick={() => handleClick(55)} />
      </div>
      <div className="board-row">
        <Square value={squares[56]} onSquareClick={() => handleClick(56)} />
        <Square value={squares[57]} onSquareClick={() => handleClick(57)} />
        <Square value={squares[58]} onSquareClick={() => handleClick(58)} />
        <Square value={squares[59]} onSquareClick={() => handleClick(59)} />
        <Square value={squares[60]} onSquareClick={() => handleClick(60)} />
        <Square value={squares[61]} onSquareClick={() => handleClick(61)} />
        <Square value={squares[62]} onSquareClick={() => handleClick(62)} />
        <Square value={squares[63]} onSquareClick={() => handleClick(63)} />
      </div>
    </>
  );
}


// const pieceTypes = ['red', 'black', 'redKing', 'blackKing'];

// const redPieceArray = []

const initialBoardLayout = [undefined, 'black', undefined, 'black', undefined, 'black', undefined, 'black', 'black', undefined, 'black', undefined, 'black', undefined, 'black', undefined, undefined, 'black', undefined, 'black', undefined, 'black', undefined, 'black', null, undefined, null, undefined, null, undefined, null, undefined, undefined, null, undefined, null, undefined, null, undefined, null, 'red', undefined, 'red', undefined, 'red', undefined, 'red', undefined, undefined, 'red', undefined, 'red', undefined, 'red', undefined, 'red', 'red', undefined, 'red', undefined, 'red', undefined, 'red', undefined];
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
