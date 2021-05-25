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

let categoryNumber = +noOfCategories.innerText;

let categoryList = [
    "Beers", "Boy's Name", "Girl's Name", "Dog Breed", "Pro Sports Team", "Cartoon characters", "Video game characters", "Move name", "Things you sit on/in", "Items of clothing", "Footwear", "Cryptocurrency", "Words related to money", "Names of candy", "Desserts", "Food items", "Offensive word", "Tech companies", "Apps", "Entrepreneurs", "Cars", "Vehicles", "Animals", "Insects", "Mammals", "Vegetables", "Fruits", "Drinks", "Restaurants", "YouTubers"
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let seconds = +time.innerText;
let secondsRemaining;

function createList() {
    const shuffled = categoryList.sort(() => 0.5 - Math.random());
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


function play() {
    const categories = document.querySelectorAll('#category');
    categories.forEach(item => {
        item.classList.toggle('paused');
    });

    playBtn.classList.toggle('pause');
    
    if(!playBtn.classList.contains('pause')) {
        startTimer();
        playBtn.innerHTML = '<i class = "fas fa-pause"></i>';
    }

    if(playBtn.classList.contains('pause')) {
        pauseTimer(); 
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
    seconds = +timeInput.value;
    time.innerText = seconds;
    playBtn.className = 'play pause';
    pauseTimer();
    startGame();
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
    }
    
});
minusBtn.addEventListener('click', () => {
    
    if(categoryNumber>2) {
        categoryNumber--;
        noOfCategories.innerText = categoryNumber;
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
})