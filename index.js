var incomingsList = document.querySelector('#incomingsList')
var addIncoming = document.querySelector('#addIncoming')
var outgoingsList = document.querySelector('#outgoingsList')
var addOutgoings = document.querySelector('#addOutgoings')
var state = {
  nextId: 3, //NOTE: must match the length of state.incomings array
  incomings: [
    {id: 1, name: "Zlecenie", amount: 2050, isEditable: false}, //item
    {id: 2, name: "Webinar", amount: 3000, isEditable: false}, //item
  ],
 nextId2: 3,
  outgoings: [
    {id: 1, name: "Czynsz", amount: 1000, isEditable: false}, //item
    {id: 2, name: "Energia elektryczna", amount: 3000, isEditable: false}, //item
  ]
}
    
renderApp()

function renderApp() {
  renderUI()
  renderSumUI()
  sumAllUI()
}


function renderUI() {
  // reset currently rendered incomings 
  incomingsList.innerHTML = ""
  
  // create new incomings
  state.incomings.forEach(item => {
    var liInnerHTML = null; 
    
    if (item.isEditable) {
      liInnerHTML = `
        <div class="item item-incoming">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditIncoming" data-id="${item.id}">Tak</button> 
        <button class="cancelEditIncoming" data-id="${item.id}">Nie</button>
      `
    } else {
      liInnerHTML = `
        ${item.name} - ${item.amount}zl 
        <button class="editIncoming" data-id="${item.id}">Edytuj</button> 
        <button class="removeIncoming" data-id="${item.id}">Usun</button>
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
  outgoingsList.innerHTML = ""
    
  // create new incomings
  state.outgoings.forEach(item => {
    var liInnerHTML2 = null; 
    
    if (item.isEditable) {
      liInnerHTML2 = `
        <div class="item item-outgoing">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditOutgoing" data-id="${item.id}">Tak</button> 
        <button class="cancelEditOutgoing" data-id="${item.id}">Nie</button>
      `
    } else {
      liInnerHTML2 = `
        ${item.name} - ${item.amount}zl 
        <button class="editOutgoing" data-id="${item.id}">Edytuj</button> 
        <button class="removeOutgoing" data-id="${item.id}">Usun</button>
      `
    }
    let newLi2 = document.createElement("li")
    newLi2.dataset.name = item.name
    newLi2.innerHTML = liInnerHTML2
    outgoingsList.append(newLi2)   
  })
  
  // add event listener for each edit "Edytuj" button
  let editOutgoing = document.querySelectorAll('.editOutgoing')
  editOutgoing.forEach(i => { 
    i.addEventListener('click', makeItemEditable2)
  })
  
  // add event listener for each edit "Tak" button
  let confirmEditOutgoing = document.querySelectorAll('.confirmEditOutgoing')
  confirmEditOutgoing.forEach(i => { 
    i.addEventListener('click', confirmEditItem2)
  })
  
  // add event listener for each edit "Nie" button
  let cancelEditOutgoing = document.querySelectorAll('.cancelEditOutgoing')
  cancelEditOutgoing.forEach(i => { 
    i.addEventListener('click', cancelEditItem2)
  })
  
  // add event listener for each remove button
  let removeOutgoing = document.querySelectorAll('.removeOutgoing') 
  removeOutgoing.forEach(i => { 
    i.addEventListener('click', removeItem2)
  })

}


function renderSumUI() {
 var incomingsSum = document.querySelector('#incomingsSum')
 // [1,2,3] -> 6 -> "6"
 // ['h', 'i'] === "hi"
 var sumOfIncomings = sum(state.incomings)
 var stringSumOfIncomings = String(sumOfIncomings)
  incomingsSum.innerHTML = `suma przychodow: ${stringSumOfIncomings}zl`;
  // TODO: outgoingsSum update
  var outgoingsSum = document.querySelector('#outgoingsSum')
  outgoingsSum.innerHTML = `suma kosztow: ${sum(state.outgoings)}zl`
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0)
}


// ADD NEW ITEM
addIncoming.addEventListener('click', addNewItem)

addOutgoings.addEventListener('click', addNewItem2)

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

function addNewItem2(f) {
    f.preventDefault()

    var newName2 = document.querySelector('#newName2')
  var newAmount2 = document.querySelector('#newAmount2')
  var newItem2 = {
    id: state.nextId2, 
    name: newName2.value, 
    amount: Number(newAmount2.value)
  }

  state.outgoings.push(newItem2)

  renderApp()
}

// MAKE AN ITEM EDITABLE
function makeItemEditable(e) {
  var id = Number(e.target.dataset.id) //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()
}

function makeItemEditable2(e) {
    var id = Number(e.target.dataset.id)
    state.outgoings = state.outgoings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()

}

// EDIT AN ITEM
function confirmEditItem(e) {
  var id = Number(e.target.dataset.id)
  var spans = document.querySelectorAll(`div.item.item-incoming [data-id="${id}"]`) //array of <span>span
  var newName = spans[0].innerText  //string
  var newAmount = Number(spans[1].innerText)  //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  //new array (replaces old incomings array)
  
  renderApp()
}

function confirmEditItem2(e) {

    var id = Number(e.target.dataset.id)
    var spans = document.querySelectorAll(`div.item.item-outgoing [data-id="${id}"]`) //array of <span>
    var newName = spans[0].innerText  //string
    var newAmount = Number(spans[1].innerText)  //number
    state.outgoings = state.outgoings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  //new array (replaces old incomings array)
        
    renderApp()
    
}

function cancelEditItem(e) {
  var id = Number(e.target.dataset.id)
    state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: false} : i)
  
  renderApp()
}
function cancelEditItem2(e) {
    var id = Number(e.target.dataset.id)
      state.outgoings = state.outgoings.map(i => i.id === id ? {...i, isEditable: false} : i)
    
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

function removeItem2(e) {
    e.preventDefault()
    
    const idToRemove = Number(e.target.dataset.id);
    // console.log(e.target.dataset.id)
    state.outgoings = state.outgoings.filter(i => i.id !== idToRemove)
    
    renderApp()
  }




function resetNewForm(name, amount) {
  name.value = ""
  amount.value = ""
}

function sumAllUI() {
  let sumEnd = document.querySelector('#sumEnd');
  let sum1 = sum(state.incomings);
  let sum2 = sum(state.outgoings);
  let result = sum1 - sum2;
  if ( result < 0) {
      sumEnd.innerHTML = `Brakuję ${result} zł`; 
  } else {
      sumEnd.innerHTML = `Pozostało ${result} zł`;
  }
  
}
// USAGE: 
//var sumArr1 = sum(arr1)
//sumAll(sumArr1, sum(arr2))