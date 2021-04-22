const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words

const words = [
    'utility',
    'audio',
    'author',
    'stagnation',
    'circumference',
    'dust',
    'kindle',
    'bottle',
    'phone',
    'resilient',
    'economist',
    'bread',
    'park',
    'admit',
    'pillow',
    'bed',
    'lunch',
    'nativity',
    'celebration',
    'elon',
    'meticulous',
    'cricket',
    'bezos',
    'money',
    'ethereum'
];

// Init word
let randomWord;

// Init score
let score= 0;

// Init time
let time = 10;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random()*words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

//Update Time
function updateTime (){
    time--;
    timeEl.innerText = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);

        // End Game
        gameOver();
    }
}

// Update Score
function updateScore () {
    score++;
    scoreEl.innerText = score;
}

// Add time based on difficulty
function addTime(){
    if(difficultySelect.value==='easy'){
        time+=5;
    } else if (difficultySelect.value==='medium'){
        time+=3;
    } else {
        time+=1;
    }

    updateTime();
}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick ="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        
        // Clear
        e.target.value = '';

        addTime();
    }
});

// Settings Button Click

settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'));