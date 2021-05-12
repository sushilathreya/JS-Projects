const rulesBtn = document.getElementById('rules-btn');
const rulesEl = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start-btn');
const newGameEl = document.getElementById('new-game');
const settingsBtn = document.getElementById('settings-btn');
const settingsEl = document.getElementById('settings');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
const difficultyEl = document.getElementById('diff');
const highScoreEl = document.getElementById('high-score');
const endGameEl = document.getElementById('end-game');
const endGameScore = document.getElementById('end-s');
const endGameHs = document.getElementById('end-hs');
const newGameBtn = document.getElementById('new-game-btn');
const endSettingsBtn = document.getElementById('end-settings-btn');


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let lives = 3;
let endcheck = 0;

const brickRowCount = 9;
const brickColCount = 5;



// Create ball props
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    size: 10,
    speed: 1,
    dx: 1,
    dy: -1
};

// Create paddle props
const paddle = {
    x: (canvas.width/2) - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 4,
    dx: 0
};

// Create Brick props
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

// Create bricks
const bricks = [];
for(let i=0; i<brickRowCount; i++) {
    bricks[i]=[];
    for(let j=0;j<brickColCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI *2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}


// Draw score on canvas
function drawScore() {
    ctx.font = '20px Verdana';
    ctx.fillText(`Score: ${score}`, canvas.width - 120, 40);
    ctx.fillText(`High Score: ${getHighScore(score, localStorage.getItem('difficulty'))}`, 20, 40);
    ctx.fillText(`Lives Remaining: ${lives < 0 ? 0: lives}`, canvas.width/2- 80, 40);
}


// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    });
}

// Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision x-axis
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    // Wall collision top-bottom
    if(ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    // Paddle collision
    if(ball.x - ball.size > paddle.x && 
    ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(ball.x - ball.size > brick.x && 
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h){
                        ball.dy *= -1;
                        brick.visible = false;
                        
                        increaseScore();
                    }
            }
        })
    });

    // Hit Bottom Wall - Lose
    if(ball.y + ball.size > canvas.height) {
        
        if(score>getHighScore(score, ball.speed)) {
            setHighScore(score, ball.speed);
        }
        lives--;
        if(lives<0) {
            endGame();
        }
        
    }
}

// Increase score
function increaseScore() {
    score++;

    if(score % (brickRowCount*brickColCount === 0)){
        showAllBricks();
    }
}

// Make all bricks appear
function showAllBricks () {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

// Change ball speed based on selected difficulty
function updateDifficulty(num) {
    setDifficulty(+num);
    ball.speed = +num;
    ball.dx = +num;
    ball.dy = +num*-1;
    paddle.speed = +num+3;
    newGameEl.style.display = 'flex';
    settingsEl.style.display = 'none';
    highScoreEl.innerText = `HighScore: ${getHighScore(0, num)}`;

    if(num==1) {
       difficultyEl.innerText = 'Difficulty: Easy';
       easy.style.backgroundColor = '#84A98C';
       medium.style.backgroundColor = '#0095dd';
       hard.style.backgroundColor = '#0095dd';
    } else if (num==2) {
        difficultyEl.innerText = 'Difficulty: Medium';
        medium.style.backgroundColor = '#84A98C';
        easy.style.backgroundColor = '#0095dd';
        hard.style.backgroundColor = '#0095dd';
        
    } else {
        difficultyEl.innerText = 'Difficulty: Hard';
        hard.style.backgroundColor = '#84A98C';
        easy.style.backgroundColor = '#0095dd';
        medium.style.backgroundColor = '#0095dd';
        
    }
}

function setDifficulty(diff) {
    localStorage.setItem('difficulty', diff);
}

// Set High score for each difficulty in local storage
function setHighScore(score, difficulty) {
    if(+difficulty==1){
        localStorage.setItem("HighscoreEasy", score);
    } else if (+difficulty==2) {
        localStorage.setItem("HighscoreMed", score);
    } else {
        localStorage.setItem("HighscoreHard", score);
    }
    
}

// Get high scores from local storage
function getHighScore(score, difficulty) {
    let highScore;
    if(+difficulty==1){
        highScore = JSON.parse(localStorage.getItem("HighscoreEasy"));
    } else if (+difficulty==2) {
        highScore = JSON.parse(localStorage.getItem("HighscoreMed"))
    } else {
        highScore = JSON.parse(localStorage.getItem("HighscoreHard"))
    }
    return highScore;
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

// Update canvas drawing and animation
function update() {
   if(endcheck!=1) {
        movePaddle();
        moveBall();

        // Draw everything
        draw();
        requestAnimationFrame(update);
   }
    
}

// update();


// End game function
function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    endcheck = 1;
    endGameEl.style.display = 'flex';
    endGameScore.innerText = `${score}`;
    endGameHs.innerText = getHighScore(score, localStorage.getItem('difficulty'));
}


function resetGame() {
    score = 0;
    showAllBricks();
    lives = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    update();
}


// Keydown event function
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

// Keyup event function
function keyUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}
// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Event Listeners
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
startBtn.addEventListener('click', () => {
    newGameEl.style.display = 'none';
    update();
});

newGameBtn.addEventListener('click', () => {
    endcheck = 0;
    endGameEl.style.display = 'none';
    resetGame();
})

settingsBtn.addEventListener('click', () => {
    newGameEl.style.display = 'none';
    settingsEl.style.display = 'flex';
})

endSettingsBtn.addEventListener('click', () => {
    endGameEl.style.display = 'none';
    settingsEl.style.display = 'flex';
})

easy.addEventListener('click', () => {
    updateDifficulty(1);
});

medium.addEventListener('click', () => {
    updateDifficulty(2)
});

hard.addEventListener('click', () => {
    updateDifficulty(4)
});

updateDifficulty(localStorage.getItem('difficulty'));

// Current Difficulty BG Color - #84A98C