export default class Ship {
  constructor (length) {
    this.length = length
    this.hits = 0
  }

  hit () {
    this.hits++
  }

  isSunken () {
    return this.hits >= this.length
  }
}
