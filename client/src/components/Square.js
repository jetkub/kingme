function Square(props) {
	const isEvenRow = props.row % 2 === 0;
	const isEvenColumn = props.column.charCodeAt() % 2 !== 0;
	const isLight = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);

	return (
		<td className={"square " + (isLight ? "light" : "dark")}>
			{props.children}
		</td>
	);
}

export default Square;
