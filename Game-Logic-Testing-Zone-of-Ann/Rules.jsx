// Thinking Space

// Just an explanation

// ex. From starting layout, Black - 'B3' to'C4'

function onPieceClick() {
    // Acknowledge what square has been clicked
        // ex. 'B3'
    // Check surrounding squares
        // ex. 'A2' '--' 'C2'
        //     '--' 'B3' '--'
        //     'A4' '--' 'C4'
        // 'A2' - Black, 'C2' - Black, 'A4' - Empty, 'C4' - Empty
    // Check moves list
        // ex. 'B3' - Black - can move to 'A4', 'C4', or (if 'C4' is 'Red') 'D5'
    // Compare moves list to surrounding squares
        // ex. 'A4' and 'C4' available

    function onDestinationClick() {
        // Acknowledge what square has been clicked
            // ex. 'C4'
        // Check if valid move was made
            // ex. true
        // Check if piece(s) were taken
            // ex. false
        // Check if game is won
            // ex. false
        // Check if able to be Kinged
            // ex. false
    }

    // Check if piece can jump again
        // ex. false
    // Tally score
        // Red - 12, Black - 12
    // End turn
        // ex. blackIsNext = false
}


// Moves List
    // Black Single Piece
        // "B1" to ("A2" || ("C2" || "D3")
        // "D1" to (("C2" || "B3") || ("E2" || "F3"))
        // "F1" to (("E2" || "D3") || ("G2" || "H3"))
        // "H1" to ("G2" || "F3")

        // "A2" to ("B3" || "C4")
        // "C2" to (("B3" || "") || ("" || ""))
        // "E2" to (("" || "") || ("" || ""))
        // "G2" to (("" || "") || "")

        // "B3" to (("" || "") || ("" || ""))
        // "D3" to (("" || "") || ("" || ""))
        // "F3" to (("" || "") || ("" || ""))
        // "H3" to (("" || "") || ("" || ""))

        // "A4" to (("" || "") || ("" || ""))
        // "C4" to (("" || "") || ("" || ""))
        // "E4" to (("" || "") || ("" || ""))
        // "G4" to (("" || "") || ("" || ""))

        // "B5" to (("" || "") || ("" || ""))
        // "D5" to (("" || "") || ("" || ""))
        // "F5" to (("" || "") || ("" || ""))
        // "H5" to (("" || "") || ("" || ""))

        // "A6" to (("" || "") || ("" || ""))
        // "C6" to (("" || "") || ("" || ""))
        // "E6" to (("" || "") || ("" || ""))
        // "G6" to (("" || "") || ("" || ""))

        // "B7" to (("" || "") || ("" || ""))
        // "D7" to (("" || "") || ("" || ""))
        // "F7" to (("" || "") || ("" || ""))
        // "H7" to (("" || "") || ("" || ""))

        // "A8" to (("" || "") || ("" || ""))
        // "C8" to (("" || "") || ("" || ""))
        // "E8" to (("" || "") || ("" || ""))
        // "G8" to (("" || "") || ("" || ""))

    // Red Single Piece
        // "B1" to ("A2" || ("C2" || "D3")
        // "D1" to (("C2" || "B3") || ("E2" || "F3"))
        // "F1" to (("E2" || "D3") || ("G2" || "H3"))
        // "H1" to (("G2" || "F3") || (""))

        // "A2" to (("" || "") || ("" || ""))
        // "C2" to (("" || "") || ("" || ""))
        // "E2" to (("" || "") || ("" || ""))
        // "G2" to (("" || "") || ("" || ""))

        // "B3" to (("" || "") || ("" || ""))
        // "D3" to (("" || "") || ("" || ""))
        // "F3" to (("" || "") || ("" || ""))
        // "H3" to (("" || "") || ("" || ""))

        // "A4" to (("" || "") || ("" || ""))
        // "C4" to (("" || "") || ("" || ""))
        // "E4" to (("" || "") || ("" || ""))
        // "G4" to (("" || "") || ("" || ""))

        // "B5" to (("" || "") || ("" || ""))
        // "D5" to (("" || "") || ("" || ""))
        // "F5" to (("" || "") || ("" || ""))
        // "H5" to (("" || "") || ("" || ""))

        // "A6" to (("" || "") || ("" || ""))
        // "C6" to (("" || "") || ("" || ""))
        // "E6" to (("" || "") || ("" || ""))
        // "G6" to (("" || "") || ("" || ""))

        // "B7" to (("" || "") || ("" || ""))
        // "D7" to (("" || "") || ("" || ""))
        // "F7" to (("" || "") || ("" || ""))
        // "H7" to (("" || "") || ("" || ""))

        // "A8" to (("" || "") || ("" || ""))
        // "C8" to (("" || "") || ("" || ""))
        // "E8" to (("" || "") || ("" || ""))
        // "G8" to (("" || "") || ("" || ""))
