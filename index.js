const sumEl = document.getElementById('sum-el')
const sendBtn = document.getElementById('send-btn')

const taskBtns = document.getElementById('task-btns')
const taskGroup = document.getElementById('selected-services')

const selectedServiceEl = document.getElementById('selected-services')

// Set: Set object lets you store unique values of any type
const selectedTasks = new Set()

// array of object to render the button
// and unique identifier
const tasks = [
    {name:'Wash Car', price : 10, id: '1'},
    {name: 'Mow Lawn' , price: 20, id: '2'},
    {name: 'Pull weeds', price: 30, id: '3'}
]

// dynamic render button
for (let task of tasks) {
    taskBtns.innerHTML += `<button value="${task.id}">${task.name}: $${task.price}</button>`
}

// event delegation
// when you have many elements handle in similar way, we can attach a single handle on their common ancester
taskBtns.addEventListener('click', function(e){
    const target = e.target
    if (target.tagName === 'BUTTON') {
        const obj = tasks.find( task => task.id === target.value)
        selectedTasks.add(obj)
    }
    renderList(selectedTasks)
})


// Delete a task from the list
taskGroup.addEventListener( 'click', function(e) {
    const target = e.target 
    if (target.tagName === 'BUTTON') {
        removeTask(target.id)
        renderList(selectedTasks)
    }  
})

//render the list(name, price, total)
function renderList(tasks){
    let sum = 0  
    let selectedServiceListDOM = ''
    
    for(let task of tasks){
        selectedServiceListDOM += `
            <div class='selected-services-row'>
                <div class='service-name-container'>
                    <p>${task.name} <button id="${task.id}" class="remove-btn">Remove</button></p>
                    
                </div>
                <p class='service-cost'><span>$</span> ${task.price}</p>
            </div>
        `
        sum += task.price
    }  
    
    selectedServiceEl.innerHTML = selectedServiceListDOM;
    sumEl.textContent= `${sum === 0 ? '' : `$${sum}`}`
}


//removing an item from the set
function removeTask(item){
    selectedTasks.forEach( task => {
        if (task.id === item) {
            selectedTasks.delete(task)
        }
    })
}


//Send button(removes list)
sendBtn.addEventListener('click', function() {
    selectedTasks.clear()
    renderList(selectedTasks)
})