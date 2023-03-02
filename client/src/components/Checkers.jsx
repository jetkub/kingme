import Row from './Row';
import BlackPiece from './pieces/BlackPiece';
import WhitePiece from './pieces/WhitePiece';
import BlackKing from './pieces/BlackKing';
import WhiteKing from './pieces/WhiteKing';

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
		<table className='no-border'>
			<thead>
				<tr>
					<th></th>
					<th>a</th>
					<th>b</th>
					<th>c</th>
					<th>d</th>
					<th>e</th>
					<th>f</th>
					<th>g</th>
					<th>h</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.map((rowData, index) => {
					const number = data.length - index;

					return <Row key={number.toString()} number={number} data={rowData} />;
				})}
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th>a</th>
					<th>b</th>
					<th>c</th>
					<th>d</th>
					<th>e</th>
					<th>f</th>
					<th>g</th>
					<th>h</th>
					<th></th>
				</tr>
			</tfoot>
		</table>
	);
}

export default Checkers;