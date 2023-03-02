import Row from "./Row";
import BlackPiece from "./pieces/BlackPiece";
import WhitePiece from "./pieces/WhitePiece";
import BlackKing from "./pieces/BlackKing";
import WhiteKing from "./pieces/WhiteKing";

function Checkers() {
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
		<table className="no-border">
			{data.map((rowData, index) => {
				const number = data.length - index;

				return <Row key={number.toString()} number={number} data={rowData} />;
			})}
		</table>
	);
}

export default Checkers;
