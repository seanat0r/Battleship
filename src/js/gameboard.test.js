import Gameboard from './gameboard' // Pfad anpassen

describe('Gameboard', () => {
  let board
  let game

  beforeEach(() => {
    game = new Gameboard()
    board = game.createBoard()
  })

  test('should place a ship correctly', () => {
    game.setShip('1-Long Ships', '0A', 'horizontal', board)
    expect(board[0][0]).toBe('S')
  })

  test('should register a hit', () => {
    game.setShip('1-Long Ships', '0A', 'horizontal', board)
    const result = game.receiveAttack('0A', board, board)
    expect(result.gotHit).toBe(true)
    expect(board[0][0]).toBe('X')
  })

  test('should register a miss', () => {
    const result = game.receiveAttack('0A', board, board)
    expect(result.gotHit).toBe(false)
    expect(board[0][0]).toBe('M')
  })

  test('should track all attacks in the logs', () => {
    game.receiveAttack('0A', board, board)
    game.receiveAttack('1A', board, board)
    const logs = game.showLogs()
    expect(logs.length).toBe(2)
    expect(logs[0]).toEqual({ position: '0A', Hit: 'No' })
  })

  test('should return true if all ships are destroyed', () => {
    game.setShip('1-Long Ships', '0A', 'horizontal', board)
    game.receiveAttack('0A', board, board)
    expect(game.allShipDestroyed()).toBe(true)
  })
})
