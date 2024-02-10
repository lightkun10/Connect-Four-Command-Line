# Connect Four Command-Line Game

This project is a command-line version of the classic game Connect Four. It was created as part of the App Academy Open curriculum.

## Features

- Command-line interface with grid display
- Cursor navigation to select columns
- Alternating turns between two players, 'X' and 'O'
- Win detection for horizontal, vertical, and diagonal lines
- Tie detection when the grid is full

## Technologies Used

- JavaScript
- Mocha for testing
- Custom Screen API for command-line rendering

## How to Run the Game

1. Clone the repository to your local machine.
2. Run `npm install` to install all packages.
3. Run `node game.js` to start the game.
4. Use the 'a' and 'd' keys to move the cursor left and right, respectively.
5. Press the 's' key to place a move in the current column.
6. The game ends when one player has four in a row or the grid is full.

## Running Tests

Run `mocha` to execute the test suite.

## Future Improvements

- Add multiplayer over network
- Improve AI for single-player mode

## Author

Fierdy Pandu[https://github.com/lightkun10]
