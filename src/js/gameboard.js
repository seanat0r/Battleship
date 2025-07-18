/* export  default */ class Gameboard {
  #boardInfo = {
    nothing: 'O',
    'Has ship': 'S',
    'Ship got Hit': 'X'
  }

  #positionAtoB = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9
  }

  #howManyShipsUsed = {
    '4-Long Ships': 1,
    '3-Long Ships': 2,
    '2-Long Ships': 3,
    '1-Long Ships': 4
  }

  createBoard () {
    const board = []
    for (let i = 0; i < 10; i++) {
      board.push([])
      for (let j = 0; j < 10; j++) {
        board[i][j] = this.#boardInfo.nothing
      }
    }
    return board
  }
  #resetPlacing (rowPosition, columPosition, counter, rotation, ship){
      if (counter === 0) return; 
      if (rotation === "horizontal"){
        this.#howManyShipsUsed[ship]++
        for (let i = rowPosition + counter; i >= rowPosition; i--) {
        
        board[i][columPosition] = ''
        board[i][columPosition] = this.#boardInfo.nothing
      }
      } else if (rotation === "vertical") {
        this.#howManyShipsUsed[ship]++
        for (let i = columPosition + counter; i >= columPosition; i--) {
    
        board[rowPosition][i] = ''
        board[rowPosition][i] = this.#boardInfo.nothing
        
      }
      } else {
        console.log(`Something went wrong: ROTATION: ${rotation}`);
        return;
      }
    }
    #outOfBounds (rotation, columPosition, rowPosition, shipLength, ship) {
      if (
        (rotation === "horizontal" && columPosition + shipLength > 10) ||
        (rotation === "vertical" && rowPosition + shipLength > 10)
      )  {
        console.warn(`Ship goes ou of bounds at ROW ${rowPosition} COLUM ${columPosition} SHIPLENGTH ${shipLength}`)
        this.#howManyShipsUsed[ship]++
        return true;
      }
      return false;
    }

  #placeShip (ship, position, rotation, board) {
    function isTaken (row, column) {
      if (board[row][column] === 'S') {
        return true
      }
      return false
    }
    
    let counter = 0;

    if (rotation !== 'vertical' && rotation !== 'horizontal') return console.log('Rotation is invalid: ' + rotation)
    // get the colum Position; extract it from the string and translate it from an obj
    const letter = position.slice(-1)
    const columPosition = this.#positionAtoB[letter]

    // get the row Position
    const rowPosition = parseInt(position.slice(0, 1))

    // get the length of the ship
    const shipLength = parseInt(ship.slice(0, 1))

    //checks if the ship in the playfield
    if (this.#outOfBounds(rotation, columPosition, rowPosition, shipLength, ship)) return;

    // if @ position of row/column already a ship, don't place any
    if (isTaken(rowPosition, columPosition)) {
      console.warn(`At ${rowPosition} or ${columPosition} is already taken!`)
      return
    }

    // if the ships has a length of 1, jus placed it at the position
    //!!! PLATZIERE NICHT AUSSERHALB VOM SPIELFELD
    if (shipLength === 1) {
      board[rowPosition][columPosition] = this.#boardInfo['Has ship']
    } else if (shipLength > 1 && rotation === 'vertical') {
      for (let i = rowPosition; i < (rowPosition + shipLength); i++) {
        if (isTaken(i, columPosition)) {
          console.warn(`At ${rowPosition} or ${columPosition} is already taken!`);
          this.#resetPlacing(rowPosition, columPosition, counter, rotation, ship)
          return;
        }
        board[i][columPosition] = ''
        board[i][columPosition] = this.#boardInfo['Has ship']
        counter ++;
      }
    } else if (shipLength > 1 && rotation === 'horizontal') {
      for (let i = columPosition; i < (columPosition + shipLength); i++) {
        if (isTaken(rowPosition, i)) {
          console.warn(`At ${rowPosition} or ${columPosition} is already taken!`);
          this.#resetPlacing(rowPosition, columPosition, counter, rotation, ship)
          return;
        }
        board[rowPosition][i] = ''
        board[rowPosition][i] = this.#boardInfo['Has ship']
        counter++;
      }
    }
  }

  #checkShip (ship) {
    if (this.#howManyShipsUsed[ship] <= 0) {
      console.warn(`${ship} already placed!`)
      return true
    }
    return false
  }

  setShip (ship, position, rotation, board) {
    switch (ship) {
      case '4-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['4-Long Ships']--
        
        this.#placeShip(ship, position, rotation, board)
        break

      case '3-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['3-Long Ships']--

        this.#placeShip(ship, position, rotation, board)
        break

      case '2-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['2-Long Ships']--

        this.#placeShip(ship, position, rotation, board)
        break

      case '1-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['1-Long Ships']--

        this.#placeShip(ship, position, rotation, board)
        break

      default:
        console.warn(`Something went wrong to place/ set the ship. Ship Value: ${ship}, Position: ${position}`)
    }
  }
}



const board = new Gameboard()
const newBoard = board.createBoard()

board.setShip('4-Long Ships', '9A', 'horizontal', newBoard)
board.setShip('3-Long Ships', '00', 'horizontal', newBoard)
board.setShip('3-Long Ships', '00', 'vertical', newBoard)
board.setShip("2-Long Ships", "0I", "horizontal", newBoard)
console.table(newBoard)

