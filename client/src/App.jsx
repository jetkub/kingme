import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Row from "./components/Row";
import BlackPiece from "./components/pieces/BlackPiece";
import WhitePiece from "./components/pieces/WhitePiece";
import BlackKing from "./components/pieces/BlackKing";
import WhiteKing from "./components/pieces/WhiteKing";

function App() {
	const data = [
		[null, BlackPiece, null, BlackPiece, null, BlackPiece, null, BlackPiece],
		[BlackPiece, null, BlackPiece, null, BlackPiece, null, BlackPiece, null],
		[null, BlackPiece, null, BlackPiece, null, BlackPiece, null, BlackPiece],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[WhitePiece, null, WhitePiece, null, WhitePiece, null, WhitePiece, null],
		[null, WhitePiece, null, WhitePiece, null, WhitePiece, null, WhitePiece],
		[WhitePiece, null, WhitePiece, null, WhitePiece, null, WhitePiece, null],
	];

	return (
		<table id="board">
			<tbody>
				{data.map((rowData, index) => {
					const number = data.length - index;

					return <Row key={number.toString()} number={number} data={rowData} />;
				})}
			</tbody>
		</table>
	);
}

export default App;
