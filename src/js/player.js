import Gameboard from './gameboard'
export default class Player {
  constructor (name) {
    this.name = name

    this.ownBoard = this.#gameboard.createBoard()
  }

  #gameboard = new Gameboard()
  #displayEnemyBoard = null

  #isDisplayEnemeyBoardNull () {
    if (this.#displayEnemyBoard === null) return true
  }

  setDisplayEnemyBoard (enemybBoard) {
    this.#displayEnemyBoard = enemybBoard
  }

  attack (position, enemybBoard) {
    if (this.#isDisplayEnemeyBoardNull) return console.log(`displayEnemyBoard is null: ${this.#displayEnemyBoard}`)

    this.ownBoard.receiveAttack(position, enemybBoard, this.#displayEnemyBoard)
  }

  placeShip (ship, position, rotation) {
    this.ownBoard.setShip(ship, position, rotation, this.ownBoard)
  }

  attackLogs () {
    this.ownBoard.showLogs()
  }

  allShipDestroyed () {
    this.ownBoard.allShipDestroyed()
  }
}
