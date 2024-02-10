const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    Screen.addCommand('w', 'to go up', () => {
      this.cursor.up();
      Screen.render();
    });

    Screen.addCommand('s', 'to go down', () => {
      this.cursor.down();
      Screen.render();
    });


    Screen.addCommand('a', 'to go left', () => {
      this.cursor.left();
      Screen.render();
    });

    Screen.addCommand('d', 'to go right', () => {
      this.cursor.right();
      Screen.render();
    });

    Screen.addCommand('p', 'place move', () => {
      this.placeMove();
      Screen.render();
    })


    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeMove() {
    // Get the current position of the cursor
    const { row, col } = this.cursor;

    // Find the lowest empty row in the current column
    let targetRow;
    for (let l = this.grid.length - 1; l >= 0; l--) {
      if (this.grid[l][col] === ' ') {
        targetRow = l;
        break;
      }
    }
    // If the column is full, show a message and return
    if (targetRow === undefined) {
      Screen.setMessage("This column is full. Try another.");
      Screen.render();
      return;
    }

    // Place the move
    this.grid[targetRow][col] = this.playerTurn;

    // Customize the screen
    Screen.setGrid(targetRow, col, this.playerTurn);
    Screen.setTextColor(targetRow, col, "blue");

    // Check winner
    let winner = ConnectFour.checkWin(this.grid);
    if (winner) {
      ConnectFour.endGame(winner);
      return;
    }

    // Switch player turn
    this.playerTurn = (this.playerTurn === 'O') ? 'X' : 'O';
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    /** Check Horizontal wins */
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length - 3; col++) {
        let pos = grid[row][col];
        if (
          pos === grid[row][col + 1] &&
          pos === grid[row][col + 2] &&
          pos === grid[row][col + 3] &&
          pos !== ' '
        ) {
          return pos;
        }
      }
    }

    /** Check Vertical wins */
    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 0; row < grid.length - 3; row++) {
        let posVert = grid[row][col];

        if (
          posVert === grid[row + 1][col] &&
          posVert === grid[row + 2][col] &&
          posVert === grid[row + 3][col] &&
          posVert !== ' '
        ) {
          return posVert;
        }
      }
    }

    /** Check Diagonal Downward */
    for (let diag = 0; diag < grid.length - 3; diag++) {
      let posDiagDown = grid[diag][diag];
      if (
        posDiagDown === grid[diag + 1][diag + 1] &&
        posDiagDown === grid[diag + 2][diag + 2] &&
        posDiagDown === grid[diag + 3][diag + 3] &&
        posDiagDown !== ' '
      ) {
        return posDiagDown;
      }
    }

    /** Check Diagonal Upward */
    for (let diag = 0; diag < grid.length - 3; diag++) {
      let posDiagDown = grid[diag][diag];
      if (
        posDiagDown === grid[diag + 1][diag + 1] &&
        posDiagDown === grid[diag + 2][diag + 2] &&
        posDiagDown === grid[diag + 3][diag + 3] &&
        posDiagDown !== ' '
      ) {
        return posDiagDown;
      }
    }

    /** Check Diagonal Downward */
    for (let row = 3; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length - 3; col++) {
        let posDiagUp = grid[row][col];
        if (
          posDiagUp === grid[row - 1][col + 1] &&
          posDiagUp === grid[row - 2][col + 2] &&
          posDiagUp === grid[row - 3][col + 3] &&
          posDiagUp !== ' '
        ) {
          return posDiagUp;
        }
      }
    }

    /** Check ties */
    for(let i = 0; i < grid.length; i++) {
      let curRow = grid[i];
      for (let j = 0; j < curRow.length; j++) {
        let curCell = curRow[j];
        if (curCell === " ") {
          return false;
        }
      }
    }

    // Nothing left? Ties!
    return 'T';
  }

  static checkEmptyGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
      let curRow = grid[i];
      for (let j = 0; j < curRow.length; j++) {
        let curCell = curRow[j];
        if (curCell === " ") {
          return true
        } // If any cell is empty, return true
      }
    }
    return false;  // If no cell is empty, return false
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
