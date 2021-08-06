class AddressList {
  constructor(root) {
    // state variables
    this.state = []
    
    // UI variables
    this.root = root
    this.form = root.querySelector('form')
    this.input = this.form.querySelector('input')
    this.help = this.form.querySelector('.help')
    this.ul = root.querySelector('ul')
    this.items = {} // id -> li element

    // event handlers
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      const address = this.input.value
      this.input.value = ''
      this.addAddress(address)
    })
    
    this.ul.addEventListener('click', e => {
      const id = e.target.getAttribute('data-delete-id')
      if (!id) return // user clicked in something else      
      this.removeAddress(id)
    })
  }
  
  addAddress(address) {
    // state logic
    const id = String(Date.now())
    this.state = this.state.concat({ address, id })
    
    // UI logic
    this.updateHelp()
    
    const li = document.createElement('li')
    const span = document.createElement('span')
    const del = document.createElement('a')
    span.innerText = address
    del.innerText = 'delete'
    del.setAttribute('data-delete-id', id)
    
    this.ul.appendChild(li)
    li.appendChild(del)
    li.appendChild(span)
    this.items[id] = li
  }
  
  removeAddress(id) {
    // state logic
    this.state = this.state.filter(item => item.id !== id)
    
    // UI logic
    this.updateHelp()
    const li = this.items[id]
    this.ul.removeChild(li)
  }
  
  // utility method
  updateHelp() {
    if (this.state.length > 0) {
      this.help.classList.add('hidden')
    } else {
      this.help.classList.remove('hidden')
    }
  }
}

class RoleAssigner {
  constructor(root, roleList) {
    this.state=roleList.state.shuffle()
    this.roleIndex=0

    this.root = root
    this.assignProgressText = document.getElementById("assignProgressText")
    this.assignProgressText.innerHTML = `${this.roleIndex}/${this.state.length}`
    this.assignNextRoleBtn = document.getElementById("assignNextRoleBtn")
    this.roleText = document.getElementById("roleText")
    this.currentRoleShowPara = document.getElementById("currentRoleShow")
    this.hideRoleTextBtn = document.getElementById("hideRoleTextBtn")
    this.assignNextRoleBtn.hidden = false
  }

  assignNextRole() {
    this.roleText.innerHTML = this.state[this.roleIndex].address
    this.roleIndex++
    this.assignProgressText.innerHTML = `${this.roleIndex}/${this.state.length}`
      this.currentRoleShowPara.hidden = false
      if (this.roleIndex >= this.state.length) {
        this.assignNextRoleBtn.hidden = true
      }
  }
}

const root = document.getElementById('roleList')
roleList = new AddressList(root)
document.getElementById("saveRole").addEventListener('click', e => {
  roleAssigner = new RoleAssigner(document.getElementById("roleAssigner"), roleList)
})

Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length-1; i >=0; i--) {

      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
  }
  return input;
}