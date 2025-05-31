export default class Gameboard {
  #boardInfo = {
    nothing: 'O',
    'Has ship': 'S',
    'Ship got Hit': 'X'
  }

  #positionAtoB = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10
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

  #placeShip (position) {}
  #checkShip (ship) {
    if (this.#howManyShipsUsed[ship] !== 0) {
      console.warn(`${ship} already placed!`)
      return true
    }
    return false
  }

  setShip (ship, position) {
    switch (ship) {
      case '4-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['4-Long Ships']--

        this.#placeShip(position)
        break

      case '3-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['3-Long Ships']--

        this.#placeShip(position)
        break

      case '2-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['2-Long Ships']--

        this.#placeShip(position)
        break

      case '1-Long Ships':
        if (this.#checkShip(ship)) break

        this.#howManyShipsUsed['1-Long Ships']--

        this.#placeShip(position)
        break
    }
  }
}
