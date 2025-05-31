import Ship from './ship'

test('Ship', () => {
  const ship = new Ship(7)
  expect(ship).toBeInstanceOf(Ship)
  while (!ship.isSunken()) {
    ship.hit()
  }
  expect(ship.isSunken()).toBe(true)
})
