//* Use for Global DOM Structure
export class AppUI {
  #gamemode = null
  #buttonAI = document.querySelector('#buttonAI')
  #buttonLocal = document.querySelector('#buttonLocal')
  
}

//* Use for placing the ships with UI
export class ShipPlacementUI {}

//* Change the UI accordingly for the battle against the AI
export class AIGameUI {}

//* Change the UI accordingly for the battle against a local player (2 real users on the same PC)
export class LocalGameUI {}
