const input = document.getElementById('input');
const addNoteBtn = document.getElementById('add-note-btn');
const noteUl = document.getElementById('notes');
const searchBar = document.getElementById('search');

let items = [];

function addNote() {
    
    if(input.value!=''){
        const listItem = document.createElement('li');
        listItem.setAttribute("id", input.value)
        listItem.innerHTML = `
            <div class = "li-div">
                <input type = "checkbox" onclick = "this.parentElement.classList.toggle('checked') class="check-box"">
                <p>${input.value}</p>
            </div>
            <button class = "delete-btn" id = "delete-btn" onclick = "this.parentElement.parentElement.removeChild(${input.value})">
                <i class = "fas fa-trash-alt"></i>
            </button>
        `;
        noteUl.appendChild(listItem);
        items.push(input.value);

        input.value = '';

} else {
    alert('Enter an item');
}
}

// Search on user input
function search() {
    let listItems = document.getElementsByTagName('li');
    for(let i = 0; i<listItems.length;i++) {
        if(listItems[i].innerText.includes(searchBar.value)){
            listItems[i].style.display = '';
        } else {
            listItems[i].style.display = 'none';
        }
        
    }
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
// 