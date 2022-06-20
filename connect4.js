/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   // The makeBoard() function needs to be implemented.
   // It should set the global board variable to be an array of 6 arrays (height), each containing 7 items (width).
   for(let y = 0; y < HEIGHT; y++){
        board.push(Array.from({length: WIDTH}));
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById('board');
   // TODO: add comment for this code
   let top = document.createElement("tr"); // create a variable for the top 'table row' element
   top.setAttribute("id", "column-top"); // set the attribute id to be 'column-top'
   top.addEventListener("click", handleClick); // make the tr responsive with a click
 
   for (let x = 0; x < WIDTH; x++) { // looping through each of the 7 cells of the tr
     let headCell = document.createElement("td"); // create table data cell elements and set them to the var headCell
     headCell.setAttribute("id", x); // give the headCell an id of x
     top.append(headCell); // add these headCells to the top variable.
   }
   htmlBoard.append(top); // finally, add the top to the actual htmlBoard
 
   // TODO: add comment for this code
   for (let y = 0; y < HEIGHT; y++) { // loop the same way we did with the headCell, but this time for the game board row
     const row = document.createElement("tr"); // create another table row element, this time set to 'row' for where potential pieces will be
     for (let x = 0; x < WIDTH; x++) { // loop through the columns of the game board
       const cell = document.createElement("td"); // the table data cell 
       cell.setAttribute("id", `${y}-${x}`); // set the id of the td to the coordinates
       row.append(cell); // add the finished data cell to the row tr
     }
     htmlBoard.append(row); // now add the row to the htmlBoard element
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]){
      return y;
    }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   let piece = document.createElement('div');
   piece.classList.add('piece');
   piece.classList.add(`p${currPlayer}`);
   piece.style.top = -50 * (y + 2);
   
   const spot = document.getElementById(`${y}-${x}`);
   spot.append(piece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
   }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();