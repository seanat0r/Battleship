export default class Gameboard {
  constructor () {
    this.shipPlaced = 0
    this.shipRemainig = 0
  }

  #boardInfo = {
    nothing: 'O',
    'Has ship': 'S',
    'Ship got Hit': 'X',
    missed: 'M'
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

  #attacklogs = []
  //*
  //* CREATING BOARD
  //*

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

  //*
  //* PLACE SHIP
  //*
  #resetPlacing (rowPosition, columPosition, counter, rotation, ship, board) {
    if (counter === 0) return
    if (rotation === 'horizontal') {
      this.#howManyShipsUsed[ship]++
      this.shipRemainig--
      for (let i = rowPosition + counter; i >= rowPosition; i--) {
        board[i][columPosition] = ''
        board[i][columPosition] = this.#boardInfo.nothing
      }
    } else if (rotation === 'vertical') {
      this.#howManyShipsUsed[ship]++
      this.shipRemainig--
      for (let i = columPosition + counter; i >= columPosition; i--) {
        board[rowPosition][i] = ''
        board[rowPosition][i] = this.#boardInfo.nothing
      }
    } else {
      console.log(`Something went wrong: ROTATION: ${rotation}`)
    }
  }

  #outOfBounds (rotation, columPosition, rowPosition, shipLength, ship) {
    if (
      (rotation === 'horizontal' && columPosition + shipLength > 10) ||
      (rotation === 'vertical' && rowPosition + shipLength > 10)
    ) {
      console.warn(
        `Ship goes ou of bounds at ROW ${rowPosition} COLUM ${columPosition} SHIPLENGTH ${shipLength}`
      )
      this.#howManyShipsUsed[ship]++
      return true
    }
    return false
  }

  #placeShip (ship, position, rotation, board) {
    function isTaken (row, column) {
      if (board[row][column] === 'S') {
        return true
      }
      return false
    }

    let counter = 0

    if (rotation !== 'vertical' && rotation !== 'horizontal') {
      return console.log('Rotation is invalid: ' + rotation)
    }
    // get the colum Position; extract it from the string and translate it from an obj
    const letter = position.slice(-1)
    const columPosition = this.#positionAtoB[letter]

    // get the row Position
    const rowPosition = parseInt(position.slice(0, 1))

    // get the length of the ship
    const shipLength = parseInt(ship.slice(0, 1))

    // checks if the ship in the playfield
    if (
      this.#outOfBounds(rotation, columPosition, rowPosition, shipLength, ship)
    ) {
      return
    }

    // if @ position of row/column already a ship, don't place any
    if (isTaken(rowPosition, columPosition)) {
      console.warn(`At ${rowPosition} or ${columPosition} is already taken!`)
      return
    }
    // tracks how many ships are
    this.shipPlaced++

    // if the ships has a length of 1, jus placed it at the position
    if (shipLength === 1) {
      this.shipRemainig++
      board[rowPosition][columPosition] = this.#boardInfo['Has ship']
    } else if (shipLength > 1 && rotation === 'vertical') {
      for (let i = rowPosition; i < rowPosition + shipLength; i++) {
        if (isTaken(i, columPosition)) {
          console.warn(
            `At ${rowPosition} or ${columPosition} is already taken!`
          )
          this.#resetPlacing(
            rowPosition,
            columPosition,
            counter,
            rotation,
            ship
          )
          return
        }
        board[i][columPosition] = ''
        board[i][columPosition] = this.#boardInfo['Has ship']
        counter++
        this.shipRemainig++
      }
    } else if (shipLength > 1 && rotation === 'horizontal') {
      for (let i = columPosition; i < columPosition + shipLength; i++) {
        if (isTaken(rowPosition, i)) {
          console.warn(
            `At ${rowPosition} or ${columPosition} is already taken!`
          )
          this.#resetPlacing(
            rowPosition,
            columPosition,
            counter,
            rotation,
            ship
          )
          return
        }
        board[rowPosition][i] = ''
        board[rowPosition][i] = this.#boardInfo['Has ship']
        counter++
        this.shipRemainig++
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
        console.warn(
          `Something went wrong to place/ set the ship. Ship Value: ${ship}, Position: ${position}`
        )
    }
  }

  //*
  //* ATTACKING
  //*

  #attackRangeOutOfMap (columPosition, rowPosition) {
    console.log('In attackRangeOutOfMap: ' + columPosition + rowPosition)
    if (
      columPosition > 10 ||
      rowPosition > 10 ||
      rowPosition === undefined ||
      columPosition === undefined
    ) {
      console.warn(
        `Attack out of the map. COLUMN: ${columPosition}, ROW ${rowPosition}`
      )
      return true
    }
    return false
  }

  receiveAttack (position, enemybBoard, displayEnemyBoard) {
    const letter = position.slice(-1)
    const columPosition = this.#positionAtoB[letter]

    const rowPosition = parseInt(position.slice(0, 1))

    console.log('In receiveAttack: ' + columPosition + ' ' + rowPosition)

    if (this.#attackRangeOutOfMap(columPosition, rowPosition)) return

    if (
      enemybBoard[rowPosition][columPosition] === this.#boardInfo['Has ship']
    ) {
      // HIT!
      console.log(
        `A Ship got hit! At Position ROW: ${rowPosition} COLUM: ${columPosition}`
      )

      enemybBoard[rowPosition][columPosition] = this.#boardInfo['Ship got Hit']
      displayEnemyBoard[rowPosition][columPosition] =
        this.#boardInfo['Ship got Hit']

      this.shipRemainig--
      this.#logAnyAttacks({ position, Hit: 'Yes' })
      return {
        gotHit: true,
        enemybBoard: 'Ship got Hit',
        displayEnemyBoard: 'Ship got Hit',
        position
      }
    }
    // MISS!
    displayEnemyBoard[rowPosition][columPosition] = this.#boardInfo.missed
    this.#logAnyAttacks({ position, Hit: 'No' })
    return {
      gotHit: false,
      enemybBoard: 'nothing',
      displayEnemyBoard: 'missed',
      position
    }
  }

  #logAnyAttacks (inputAttack) {
    if (!inputAttack) {
      return console.log(`No Attack to log: ${inputAttack}`)
    }
    this.#attacklogs.push(inputAttack)
  }

  showLogs () {
    return this.#attacklogs
  }

  allShipDestroyed () {
    return this.shipRemainig === 0
  }
}
