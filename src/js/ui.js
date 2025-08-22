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

  eventForName () {
    return new Promise((resolve, reject) => {
      sectionArea.innerHTML = ''
      const name1 = this.createElementInput(1)
      const name2 = this.createElementInput(2)
      const btnSend = this.createElementSend()

      const timeoutID = setTimeout(() => {
        console.log('Timeout, 5 mins over')
      }, 300000)

      btnSend.addEventListener('click', () => {
        if (!name1 || !name2) {
          return console.error(
            `nameField 1 and/or 2 couldn't find: ${name1} or ${name2}`
          )
        }

        if (name1.value === null && name2.value === null) {
          name1.setAttribute('value', 'User 1')
          name2.setAttribute('value', 'User 2')
        }

        clearTimeout(timeoutID)
        console.log('Timer stoped')

        resolve(this.getName(name1, name2))
      })
    })
  }

  //* create input field and send btn for names
  eventListenerAddElements () {
    return new Promise((resolve, reject) => {
      buttonLocal.addEventListener(
        'click',
        () => {
          this.eventForName()
            .then((names) => {
              resolve(names)
            })
            .catch((err) => {
              reject(err)
            })
        },
        { once: true }
      )
    })
  }
}
