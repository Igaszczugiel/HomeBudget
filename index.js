var incomingsList = document.querySelector('#incomingsList')
var addIncoming = document.querySelector('#addIncoming')
var state = {
  incomings: [
    {name: "A", amount: 2050},
    {name: "B", amount: 3000},
  ],
  outgoings: []
}

renderApp()

function renderApp() {
  renderUI()
  renderSumUI()
}





function renderUI() {
  incomingsList.innerHTML = ""
  
  state.incomings.forEach(item => {
    var liInnerHTML = `
        <li data-name="${item.name}">
          ${item.name} - ${item.amount}zl 
          <button>Edytuj</button> 
          <button>Usun</button>
        </li>
    `
    
    var newLi = document.createElement("li")
    newLi.innerHTML = liInnerHTML
    incomingsList.append(newLi)
  })
}

function renderSumUI() {
  var incomingsSum = document.querySelector('#incomingsSum')
  incomingsSum.innerHTML = `suma przychodow: ${sum(state.incomings)}zl`
  // TODO: outgoingsSum update
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0)
}


// ADD NEW ITEM

addIncoming.addEventListener('click', addNewItem)

function addNewItem(e) {
  e.preventDefault()
  
  var newName = document.querySelector('#newName').value
  var newAmount = Number(document.querySelector('#newAmount').value)
  var newItem = {name: newName, amount: newAmount}
  state.incomings.push(newItem) //update of data (danych)
  
  renderApp()
}