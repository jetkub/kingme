import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Checkers from './components/Checkers';
import Menu from './components/Menu';
import { Route, Routes } from 'react-router-dom';


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
