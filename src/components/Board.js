import { useState } from "react";

export default function Board() {
    const [blackIsNext, setBlackIsNext] = useState(true);

    const [squares, setSquares] = useState(Array(64).fill(null));

    
}
