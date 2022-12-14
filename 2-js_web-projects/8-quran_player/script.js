const image = document.querySelector('img');
const title = document.getElementById('title');
const reciter = document.getElementById('reciter');
const quran = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Quran
const recitation = [
    {
        name: 'quran-1',
        displayName: 'Al-Fatiha',
        reciter: 'Yasser Al-Dosari',
    },
    {
        name: 'quran-2',
        displayName: "Ar-Ra'd",
        reciter: 'Islam Sobhi',
    },
    {
        name: 'quran-3',
        displayName: 'Maryam',
        reciter: 'Rashid AlaFasy',
    },
    {
        name: 'quran-4',
        displayName: 'At-Takwir',
        reciter: 'Muhammad Ayyub',
    }
]

// Check If Playing
let isPlaying = false;

// Play
function playQuran() {
    isPlaying = true;
    quran.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
}

// Pause
function pauseQuran() {
    isPlaying = false;
    quran.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseQuran(): playQuran()
});

// Update DOM
function loadQuran(quran_recitation) {
    title.textContent = quran_recitation.displayName;
    reciter.textContent = quran_recitation.reciter;
    quran.src = `quran/${quran_recitation.name}.mp3`;
    image.src = `img/${quran_recitation.name}.jpg`;
    image.className = ""
    image.classList.add(`${quran_recitation.name}-fit`);
}

// Current recitation
let quranIndex = 0;

// Next Recitation
function prevRecitation() {
    if (quranIndex > 0) {
        quranIndex--;
    } else {
        quranIndex = recitation.length - 1;
    }
    loadQuran(recitation[quranIndex]);
    playQuran();
}

// Next Recitation
function nextRecitation() {
    if (quranIndex < recitation.length - 1) {
        quranIndex++;
    } else {
        quranIndex = 0;
    }
    loadQuran(recitation[quranIndex]);
    playQuran();
}

// On Load - Select First Quran
loadQuran(recitation[quranIndex]);

// Update Progress Bar & Time
function updateProgressBar(event) {
    if (isPlaying) {
        const {duration, currentTime} = event.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //  Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor((duration % 60));
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //  Delay Switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
      
        //  Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor((currentTime) % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}
// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = quran;
    quran.currentTime = (clickX / width) * duration;
}
// Event Listeners
prevBtn.addEventListener('click', prevRecitation);
nextBtn.addEventListener('click', nextRecitation);
quran.addEventListener('ended', nextRecitation);
quran.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);