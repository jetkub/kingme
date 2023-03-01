import Square from "./Square";

function Row(props) {
	return (
		<tr>
			<th>{props.number}</th>
			{props.data.map((Piece, index) => {
				const column = String.fromCharCode(97 + index);
				return (
					<Square
						key={column + props.number}
						row={props.number}
						column={column}
					>
						{Piece && <Piece />}
					</Square>
				);
			})}
			<th>{props.number}</th>
		</tr>
	);
}

export default Row;
