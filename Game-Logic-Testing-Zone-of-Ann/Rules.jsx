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
        // "C2" to (("B3" || "A4") || ("D3" || "E4"))
        // "E2" to (("D3" || "C4") || ("F3" || "G4"))
        // "G2" to (("F3" || "E4") || "H3")

        // "B3" to ("A4" || ("C4" || "D5"))
        // "D3" to (("C4" || "B5") || ("E4" || "F5"))
        // "F3" to (("E4" || "D5") || ("G4" || "H5"))
        // "H3" to ("G4" || "F5")

        // "A4" to ("B5" || "C6")
        // "C4" to (("B5" || "A6") || ("D5" || "E6"))
        // "E4" to (("D5" || "C6") || ("F5" || "G6"))
        // "G4" to (("F5" || "E6") || "H5")

        // "B5" to ("A6" || ("C6" || "D7"))
        // "D5" to (("C6" || "B7") || ("E6" || "F7"))
        // "F5" to (("E6" || "D7") || ("G6" || "H7"))
        // "H5" to ("G6" || "F7")

        // "A6" to ("B7" || "C8")
        // "C6" to (("B7" || "A8") || ("D7" || "E8"))
        // "E6" to (("D7" || "C8") || ("F7" || "G8"))
        // "G6" to (("F7" || "E8") || "H7")

        // "B7" to ("A8" || "C8")
        // "D7" to ("C8" || "E8")
        // "F7" to ("E8" || "G8")
        // "H7" to "G8"

        // "A8"
        // "C8"
        // "E8"
        // "G8"

    // Red Single Piece
        // "B1"
        // "D1"
        // "F1"
        // "H1"

        // "A2" to "B1"
        // "C2" to ("B1" || "D1")
        // "E2" to ("D1" || "F1")
        // "G2" to ("F1" || "H1")

        // "B3" to ("A2" || ("C2" || "D1"))
        // "D3" to (("C2" || "B1") || ("E2" || "F1"))
        // "F3" to (("E2" || "D1") || ("G2" || "H1"))
        // "H3" to ("G2" || "F1")

        // "A4" to ("B3" || "C2")
        // "C4" to (("B3" || "A2") || ("D3" || "E2"))
        // "E4" to (("D3" || "C2") || ("F3" || "G2"))
        // "G4" to (("F3" || "E2") || "H3")

        // "B5" to ("A4" || ("C4" || "D3"))
        // "D5" to (("C4" || "B3") || ("E4" || "F3"))
        // "F5" to (("E4" || "D3") || ("G4" || "H3"))
        // "H5" to ("G4" || "F3")

        // "A6" to ("B5" || "C4")
        // "C6" to (("B5" || "A4") || ("D5" || "E4"))
        // "E6" to (("D5" || "C4") || ("F5" || "G4"))
        // "G6" to (("F5" || "E4") || "H5")

        // "B7" to ("A6" || ("C6" || "D5"))
        // "D7" to (("C6" || "B5") || ("E6" || "F5"))
        // "F7" to (("E6" || "D5") || ("G6" || "H5"))
        // "H7" to ("G6" || "F5")

        // "A8" to ("B7" || "C6")
        // "C8" to (("B7" || "A6") || ("D7" || "E6"))
        // "E8" to (("D7" || "C6") || ("F7" || "G6"))
        // "G8" to (("F7" || "E6") || "H7")

    // Kinged Pieces
        // "B1" to ("A2" || ("C2" || "D3")
        // "D1" to (("C2" || "B3") || ("E2" || "F3"))
        // "F1" to (("E2" || "D3") || ("G2" || "H3"))
        // "H1" to ("G2" || "F3")

        // "A2" to (("B3" || "C4") || "B1")
        // "C2" to (("B3" || "A4") || ("D3" || "E4") || "B1" || "D1")
        // "E2" to (("D3" || "C4") || ("F3" || "G4") || "D1" || "F1")
        // "G2" to (("F3" || "E4") || "H3" || "F1" || "H1")

        // "B3" to ("A4" || ("C4" || "D5") || "A2" || ("C2" || "D1"))
        // "D3" to (("C4" || "B5") || ("E4" || "F5") || ("C2" || "B1") || ("E2" || "F1"))
        // "F3" to (("E4" || "D5") || ("G4" || "H5") || ("E2" || "D1") || ("G2" || "H1"))
        // "H3" to (("G4" || "F5") || ("G2" || "F1"))

        // "A4" to (("B5" || "C6") || ("B3" || "C2"))
        // "C4" to (("B5" || "A6") || ("D5" || "E6") || ("B3" || "A2") || ("D3" || "E2"))
        // "E4" to (("D5" || "C6") || ("F5" || "G6") || ("D3" || "C2") || ("F3" || "G2"))
        // "G4" to (("F5" || "E6") || "H5" || ("F3" || "E2") || "H3")

        // "B5" to ("A6" || ("C6" || "D7") || "A4" || ("C4" || "D3"))
        // "D5" to (("C6" || "B7") || ("E6" || "F7") || ("C4" || "B3") || ("E4" || "F3"))
        // "F5" to (("E6" || "D7") || ("G6" || "H7") || ("E4" || "D3") || ("G4" || "H3"))
        // "H5" to (("G6" || "F7") || ("G4" || "F3"))

        // "A6" to ("B7" || "C8" || ("B5" || "C4"))
        // "C6" to (("B7" || "A8") || ("D7" || "E8") || ("B5" || "A4") || ("D5" || "E4"))
        // "E6" to (("D7" || "C8") || ("F7" || "G8") || ("D5" || "C4") || ("F5" || "G4"))
        // "G6" to (("F7" || "E8") || "H7" || ("F5" || "E4") || "H5")

        // "B7" to ("A8" || "C8" || "A6" || ("C6" || "D5"))
        // "D7" to ("C8" || "E8" || ("C6" || "B5") || ("E6" || "F5"))
        // "F7" to ("E8" || "G8" || ("E6" || "D5") || ("G6" || "H5"))
        // "H7" to ("G8" || ("G6" || "F5"))

        // "A8" to ("B7" || "C6")
        // "C8" to (("B7" || "A6") || ("D7" || "E6"))
        // "E8" to (("D7" || "C6") || ("F7" || "G6"))
        // "G8" to (("F7" || "E6") || "H7")
