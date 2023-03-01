import Square from "./Square";

function Row(props) {
	return (
		<tr>
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
		</tr>
	);
}

export default Row;
