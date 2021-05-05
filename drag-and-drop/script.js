const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const batsmen = [
    'Kane Williamson',
    'Steve Smith',
    'Marnus Labuschagne',
    'Joe Root',
    'Virat Kohli',
    'Rishabh Pant',
    'Henry Nicholls',
    'Rohit Sharma',
    'Babar Azam',
    'David Warner'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...batsmen]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .forEach((batsman, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
            <span class = "number">${index + 1}</span>
            <div class = "draggable" draggable="true">
                <p class = "name">${batsman.value}</p>
                <i class = "fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    })

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.classList.remove('over');
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap drag and drop items
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Compare order of list items
function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText;

        if(personName!=batsmen[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}


// Button event listener
check.addEventListener('click', checkOrder);