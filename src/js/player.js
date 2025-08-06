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
}
