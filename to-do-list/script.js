const input = document.getElementById('input');
const addNoteBtn = document.getElementById('add-note-btn');
const noteUl = document.getElementById('notes');
const searchBar = document.getElementById('search');

const items = getNotes();
populateDOM();
function addNote() {
    
    if(input.value!=''){
        const listItem = document.createElement('li');
        listItem.setAttribute("id", input.value.toLowerCase().split(" ").join(''));  
        listItem.innerHTML = `
            <div class = "li-div">
                <input type = "checkbox" onclick = "this.parentElement.classList.toggle('checked')">
                <p>${input.value}</p>
            </div>
            <button class = "delete-btn" id = "delete-btn" onclick = "removeItem(this.parentElement, '${input.value}')">
                <i class = "fas fa-trash-alt"></i>
            </button>
        `;
        noteUl.appendChild(listItem);
        items.push(input.value);
        console.log(items);
        localStorage.setItem(`toDoItems`, JSON.stringify(items));
        input.value = '';

} else {
    alert('Enter an item');
}
}


function getNotes() {
    const noteItems = JSON.parse(localStorage.getItem('toDoItems'));
    return noteItems === null ? [] : noteItems;
}

function populateDOM () {
   let i = items.length;
    while(i--) {
        let noteItem = document.createElement('li');
        value = items[i];
        noteItem.setAttribute("id", value.toLowerCase().split(" ").join(""));
        noteItem.innerHTML = `
        <div class = "li-div">
            <input type = "checkbox" onclick = "this.parentElement.classList.toggle('checked')">
            <p>${value}</p>
        </div>
        <button class = "delete-btn" id = "delete-btn" onclick = "removeItem(this.parentElement, '${value}')">
            <i class = "fas fa-trash-alt"></i>
        </button>
    `;
    noteUl.appendChild(noteItem);
    }


}



// Search on user input
function search() {
    let listItems = document.getElementsByTagName('li');
    for(let j = 0; j<listItems.length;j++) {
        if(listItems[j].innerText.toLowerCase().includes(searchBar.value.toLowerCase())){
            listItems[j].style.display = '';
        } else {
            listItems[j].style.display = 'none';
        }
        
    }
}


function removeItem(item, value) {
    item.remove();
    items.splice(items.indexOf(value), 1);
    console.log(items);
    localStorage.setItem('toDoItems', JSON.stringify(items));
}

// Add note event listener
addNoteBtn.addEventListener('click', addNote);

input.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        addNote();
    }   
});

searchBar.addEventListener('keyup', (e) => {
       search(); 
});

// this.parentElement.parentElement.removeChild(${input.value.toLowerCase().split(" ").join('')}), ${items.splice(items.indexOf(input.value), 1)}, localStorage.setItem('toDoItems', JSON.stringify(${items})), console.log(${items.splice(items.indexOf(input.value), 1)})