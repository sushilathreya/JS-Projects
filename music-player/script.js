const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song Titles
const songs = ['Feeling Good', 'DNET', 'Dowdowdow', 'Half Past Two', 'Lowkey'];

// Keep trak of song
let songIndex = 0;

// Initially load song details into DOM
loadSong (songs[songIndex]);

// Update song details

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong()
{
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause Song
function pauseSong()
{
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// Previous Song
function prevSong(){
    songIndex--;

    if(songIndex<0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;

    if(songIndex==songs.length){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration)*100;

    progress.style.width = `${progressPercent}%`;

}

// Set Progress Bar
function setProgress (e)  {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width)*duration;

}

// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong ();
    }
})

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// Click on Progress Bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener ('ended', nextSong);