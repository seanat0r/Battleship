import Gameboard from './gameboard'
export default class Player {
  constructor (name) {
	this.name = name;

    this.ownBoard = this.#gameboard.createBoard()
  }

  #gameboard = new Gameboard()
}
