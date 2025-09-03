import 'core-js/stable'
import 'regenerator-runtime/runtime'

//* Use for Global DOM Structure
const gamemode = null
const buttonAI = document.querySelector('#buttonAI')
const buttonLocal = document.querySelector('#buttonLocal')
const sectionArea = document.querySelector('#changeLayout')
export class AppUI {}

//* Use for placing the ships with UI
export class ShipPlacementUI {}

//* Change the UI accordingly for the battle against the AI
export class AIGameUI {}

//* Change the UI accordingly for the battle against a local player (2 real users on the same PC)
export class LocalGameUI {
  createElementInput (number) {
    const nameField = document.createElement('input')
    nameField.setAttribute('type', 'text')
    nameField.setAttribute('id', `nameField${number}`)
    nameField.setAttribute('value', `User ${number}`)
    sectionArea.appendChild(nameField)
    return nameField
  }

  createElementSend () {
    const sendNameBtn = document.createElement('button')
    sendNameBtn.setAttribute('id', 'sendNameBtn')
    sendNameBtn.textContent = 'Play!'
    sectionArea.appendChild(sendNameBtn)
    return sendNameBtn
  }

  getName (name1, name2) {
    const username1 = name1.value
    const username2 = name2.value

    return {
      user1: username1,
      user2: username2
    }
  }

  //* create Layout for name Inputs
  nameInputLayout () {
    sectionArea.innerHTML = ''
    this.createElementInput(1)
    this.createElementInput(2)
    this.createElementSend()
  }

  //* create input field and send btn for names
  eventListenerForNameInputLayout () {
    buttonLocal.addEventListener('click', async () => {
      this.nameInputLayout()
      const nameObj = await this.addEventListenerForNameOutpu()
      if (!nameObj) return
      console.log(nameObj)
    })
  }

  //* Checking input value from name1 and name2
  checkNameValue (name1, name2) {
    if (!name1 || !name2) {
      console.error(`nameField 1 and/or 2 couldn't find: ${name1} or ${name2}`)
      return false
    }
    if (name1.value === name2.value) return false

    if (name1.value === '' || name2.value === '') return false

    if (name1.value === null && name2.value === null) {
      name1.setAttribute('value', 'User 1')
      name2.setAttribute('value', 'User 2')
    }
    return true
  }

  //* logic for sending
  sendingNameOutput () {
    console.log('im here')
    const name1 = document.querySelector('#nameField1')
    const name2 = document.querySelector('#nameField2')

    if (!this.checkNameValue(name1, name2)) {
      window.alert('No name in the box or has 2 identicall name')
      return null
    }
    return this.getName(name1, name2)
  }

  //* eventlistener for sending
  addEventListenerForNameOutpu () {
    return new Promise((resolve) => {
      const sendNameBtn = document.querySelector('#sendNameBtn')

      const handler = () => {
        const names = this.sendingNameOutput()

        if (!names) {
          return
        }

        sendNameBtn.removeEventListener('click', handler)
        resolve(names)
      }

      sendNameBtn.addEventListener('click', handler)
    })
  }
}
