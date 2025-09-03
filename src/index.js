// Importing JS
// import 'core-js'
// import 'regenerator-runtime/runtime'
import Ship from './js/ship'
import Gameboard from './js/gameboard'
import AppUI, { LocalGameUI } from './js/ui'
// Importing CSS
import './styles/reset.css'
import './styles/style.css'

// Your code here
const localUI = new LocalGameUI()

async function localGameUI () {
  const name = await localUI.eventListenerForNameInputLayout()
  if (!name) return
  console.log(name)
}
localGameUI()
