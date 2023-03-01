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

