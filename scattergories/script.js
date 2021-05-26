const randomLetterBtn = document.getElementById('random-letter');
const editTimeBtn = document.getElementById('edit-time');
const playBtn = document.getElementById('play');
const restartBtn = document.getElementById('restart');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const categoryEl = document.getElementById('categories');
const time = document.getElementById('time');
const noOfCategories = document.getElementById('number');
const letter = document.getElementById('letter');
const editTimeEl = document.getElementById('time-container');
const timeInput = document.getElementById('timeInput');
const updateTimeBtn = document.getElementById('updateTime');
const addCategoryBtn = document.getElementById('add-categories');
const addCategoryEl = document.getElementById('add-category-container');
const addCategoryInput = document.getElementById('add-category');
const categoryListEl = document.getElementById('category-list');

timeInput.value = '30';

let categoryNumber = +noOfCategories.innerText;

let categoryList = getCategories();

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let seconds = +time.innerText;
let secondsRemaining;

function createList() {
    let listCopy = categoryList;
    const shuffled = listCopy.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, categoryNumber);
    for(let i=0; i<categoryNumber; i++) {
        let category = document.createElement('div');
        category.className = 'word-wrap';

        category.innerHTML = `
            <span class="serial-no" id="serial-no">${i+1}</span>
            <span class="category paused" id="category">${selected[i]}</span>
        `;

        categoryEl.appendChild(category);
    }
}

function startGame() {
    generateRandomLetter();
    createList();
}

function generateRandomLetter() {
    letter.innerText = alphabet[Math.floor(Math.random() * alphabet.length)];
}

startGame();

function getCategories() {
    const categoryItems = JSON.parse(localStorage.getItem('categoryItems'));
    return categoryItems === null ? [
        "Beers", "Boy's names", "Girl's names", "Dog breeds", "Pro sports teams", "Cartoon characters", "Video game characters", "Movie names", "Things you sit on/in", "Items of clothing", "Footwear", "Cryptocurrency", "Words related to money", "Names of candy", "Desserts", "Dishes", "Offensive words", "Tech companies", "Apps", "Entrepreneurs", "Cars", "Vehicles", "Animals", "Insects", "Mammals", "Vegetables", "Fruits", "Drinks", "Restaurant Names", "YouTubers"
    ] : categoryItems;
}


function play() {
    const categories = document.querySelectorAll('#category');
    categories.forEach(item => {
        item.classList.toggle('paused');
    });

    playBtn.classList.toggle('pause');
    
    if(!playBtn.classList.contains('pause')) {
        startTimer();
        playBtn.innerHTML = '<i class = "fas fa-pause"></i>';
        minusBtn.style.visibility = 'hidden';
        plusBtn.style.visibility = 'hidden';
        randomLetterBtn.style.visibility = 'hidden';
        editTimeBtn.style.visibility = 'hidden';
        addCategoryBtn.style.visibility = 'hidden';
    }

    if(playBtn.classList.contains('pause')) {
        pauseTimer();
        minusBtn.style.visibility = 'visible';
        plusBtn.style.visibility = 'visible';
        randomLetterBtn.style.visibility = 'visible';
        editTimeBtn.style.visibility = 'visible';
        addCategoryBtn.style.visibility = 'visible';
    }
    
}

function startTimer() {
        secondsRemaining = setInterval(() => {
        seconds--;
        time.innerText = seconds;

        if(seconds<=0) {
            clearInterval(secondsRemaining);
        }
    }, 1000);   
}

function pauseTimer() {
    playBtn.innerHTML = '<i class = "fas fa-play"></i>';
    clearInterval(secondsRemaining);
}


function restartGame() {
    categoryEl.innerHTML = '';
    seconds = timeInput.value == '0'? 30 : +timeInput.value;
    time.innerText = seconds;
    playBtn.className = 'play pause';
    pauseTimer();
    startGame();
}

function showCategoryList() {
    
    for(let j = categoryList.length - 1; j >= 0; j--) {
            
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${categoryList[j]}</span>
            <button id = "delete-btn" class = "delete-btn" onclick = "removeItem(this.parentElement, 'categoryList[j]')">
                <i class = "fas fa-trash"></i>
            </button>
        `;

        categoryListEl.appendChild(listItem);
    }
    
    
}

function removeItem(item, value) {
    item.remove();
    categoryList.splice(categoryList.indexOf(value), 1);
    localStorage.setItem('categoryItems', JSON.stringify(categoryList));
}



function addCategories() {
    
    let lowerCaseCat = categoryList.map (item => item.toLowerCase())
    if(lowerCaseCat.includes(addCategoryInput.value.trim().toLowerCase())) {
        alert('Category already exists');
    } else {
        categoryList.push(addCategoryInput.value);
        localStorage.setItem('categoryItems', JSON.stringify(categoryList));
        categoryListEl.innerHTML = '';
        showCategoryList();
        addCategoryInput.value = '';
    }
    
}


function updateTime() {
    seconds = +timeInput.value;
    time.innerText = seconds;
    editTimeEl.classList.remove('edit');
}

// Event Listeners
playBtn.addEventListener('click', play);
plusBtn.addEventListener('click', () => {
    
    if(categoryNumber<15) {
        categoryNumber++;
        noOfCategories.innerText = categoryNumber;
        categoryEl.innerHTML = '';
        createList();
        seconds = +timeInput.value;
        time.innerText = seconds;
    }
    
});
minusBtn.addEventListener('click', () => {
    
    if(categoryNumber>2) {
        categoryNumber--;
        noOfCategories.innerText = categoryNumber;
        categoryEl.innerHTML = '';
        createList();
        seconds = +timeInput.value;
        time.innerText = seconds;
    }
    
});
restartBtn.addEventListener('click', restartGame);
randomLetterBtn.addEventListener('click', generateRandomLetter);
editTimeBtn.addEventListener('click', () => {
    editTimeEl.classList.toggle('edit');
    timeInput.value = seconds;
});

updateTimeBtn.addEventListener('click', updateTime);
timeInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        updateTime();
    }
});

addCategoryBtn.addEventListener('click', () => {
    addCategoryEl.classList.toggle('add');
    categoryEl.classList.toggle('hide');
    addCategoryInput.focus();
    if(addCategoryEl.classList.contains('add')) {
        addCategoryBtn.innerText = 'Hide Category List';
        showCategoryList();
    } else {
        addCategoryBtn.innerText = 'Add a category';
    }
});

addCategoryInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        addCategories();
    }
});