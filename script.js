
import { generateRandomColor } from '../shared/randomColor.js';

let items = [];
const itemDiv = document.getElementById("items")

const inputField = document.getElementById("itemInput")
const todoItems = "todoItems"


function renderItems() {
    itemDiv.innerHTML = null;

    for (const [index, item] of Object.entries(items)) {
        const container = document.createElement("div")
        container.style.marginBottom = "5px"
        // layout: text on the left, delete button on the right
        container.style.display = "flex"
        container.style.justifyContent = "space-between"
        container.style.alignItems = "center"
        container.style.padding = "5px"
        container.style.borderRadius = '10px'


        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.style.flex = "1"
        text.textContent = item
        container.style.backgroundColor = generateRandomColor()

        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        deleteButton.style.marginLeft = "10px"
        deleteButton.style.border = "none"
        deleteButton.style.background = "transparent"
        deleteButton.style.cursor = "pointer"
        deleteButton.onclick = () => removeItem(index)
        container.appendChild(text)
        container.appendChild(deleteButton)
        itemDiv.appendChild(container)
    }
}

function loadItems() {
    const storedItems = localStorage.getItem("todoItems")
    if (storedItems) {
        items = JSON.parse(storedItems)
    }
    renderItems()


}

function saveItems() {
    const stringifiedItems = JSON.stringify(items)
    localStorage.setItem("todoItems", stringifiedItems)

}



function addItem(text) {
    const value = inputField.value;
    if (!value) {
        alert("Please enter a task.")
        return
    }
    items.push(value)
    renderItems()
    inputField.value = ""
    saveItems()
}


function removeItem(index) {
    items.splice(index, 1)
    renderItems()
    saveItems()
}

document.addEventListener("DOMContentLoaded", loadItems)

// expose `addItem` so inline `onclick="addItem()"` works when this file is loaded as a module
window.addItem = addItem