var incomingsList = document.querySelector('#incomingsList')
var addIncoming = document.querySelector('#addIncoming')
var state = {
  nextId: 3, //NOTE: must match the length of state.incomings array
  incomings: [
    {id: 1, name: "Zlecenie", amount: 2050, isEditable: false}, //item
    {id: 2, name: "Webinar", amount: 3000, isEditable: false}, //item
  ],
  outgoings: []
}

renderApp()

function renderApp() {
  renderUI()
  renderSumUI()
}

function renderUI() {
  // reset currently rendered incomings 
  incomingsList.innerHTML = ""
  
  // create new incomings
  state.incomings.forEach(item => {
    var liInnerHTML = null; 
    
    if (item.isEditable) {
      liInnerHTML = `
        <div class="item">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditIncoming" data-id="${item.id}">Confirm</button> 
        <button class="cancelEditIncoming" data-id="${item.id}">Cancel</button>
      `
    } else {
      liInnerHTML = `
        ${item.name} - ${item.amount}zl 
        <button class="editIncoming" data-id="${item.id}">Edit</button> 
        <button class="removeIncoming" data-id="${item.id}">Remove</button>
      `
    }
    let newLi = document.createElement("li")
    newLi.dataset.name = item.name
    newLi.innerHTML = liInnerHTML
    incomingsList.append(newLi)   
  })
  
  // add event listener for each edit "Edytuj" button
  let editIncomings = document.querySelectorAll('.editIncoming')
  editIncomings.forEach(i => { 
    i.addEventListener('click', makeItemEditable)
  })
  
  // add event listener for each edit "Tak" button
  let confirmEditIncomings = document.querySelectorAll('.confirmEditIncoming')
  confirmEditIncomings.forEach(i => { 
    i.addEventListener('click', confirmEditItem)
  })
  
  // add event listener for each edit "Nie" button
  let cancelEditIncomings = document.querySelectorAll('.cancelEditIncoming')
  cancelEditIncomings.forEach(i => { 
    i.addEventListener('click', cancelEditItem)
  })
  
  // add event listener for each remove button
  let removeIncomings = document.querySelectorAll('.removeIncoming') 
  removeIncomings.forEach(i => { 
    i.addEventListener('click', removeItem)
  })
}

function renderSumUI() {
  var incomingsSum = document.querySelector('#incomingsSum')
  incomingsSum.innerHTML = `Incomes summary: ${sum(state.incomings)}zl`
  // TODO: outgoingsSum update
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0)
}


// ADD NEW ITEM
addIncoming.addEventListener('click', addNewItem)

function addNewItem(e) {
  e.preventDefault()
  
  var newName = document.querySelector('#newName')
  var newAmount = document.querySelector('#newAmount')
  var newItem = {
    id: state.nextId, 
    name: newName.value, 
    amount: Number(newAmount.value)
  }
  state.incomings.push(newItem) //update of data (danych)
  
  renderApp()
  resetNewForm(newName, newAmount)
  state.nextId = state.nextId + 1
}

// MAKE AN ITEM EDITABLE
function makeItemEditable(e) {
  var id = Number(e.target.dataset.id) //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()
}

// EDIT AN ITEM
function confirmEditItem(e) {
  var id = Number(e.target.dataset.id)
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`) //array of <span>
  var newName = spans[0].innerText  //string
  var newAmount = Number(spans[1].innerText)  //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  //new array (replaces old incomings array)
  
  renderApp()
}

function cancelEditItem(e) {
  var id = Number(e.target.dataset.id)
    state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: false} : i)
  
  renderApp()
}

// REMOVE AN ITEM
function removeItem(e) {
  e.preventDefault()
  
  const idToRemove = Number(e.target.dataset.id);
  // console.log(e.target.dataset.id)
  state.incomings = state.incomings.filter(i => i.id !== idToRemove)
  
  renderApp()
}


function resetNewForm(name, amount) {
  name.value = ""
  amount.value = ""
}