const input = document.getElementById('input');
const addNoteBtn = document.getElementById('add-note-btn');
const noteUl = document.getElementById('notes');

function addNote() {
    
    if(input.value!=''){
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class = "li-div">
                <input type = "checkbox" onclick = "this.parentElement.classList.toggle('checked')">
                <p>${input.value}</p>
            </div>
            <button class = "delete-btn" id = "delete-btn" onclick = "this.parentElement.style.display = 'none'">
                <i class = "fas fa-trash-alt"></i>
            </button>
        `;
        noteUl.appendChild(listItem);

        input.value = '';

} else {
    alert('Enter an item');
}
}


// Add note event listener
addNoteBtn.addEventListener('click', addNote);
input.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        addNote();
    }   
});

// 