const timeDisplay = document.querySelector(".timer");

let isRunningTimer = false;
let elapsedTimer = 0;
let intervalTimer;

// Таймер
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(1, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 100)).padStart(1, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Обновление дисплея
function updateTimerDisplay() {
    timeDisplay.textContent = formatTime(elapsedTimer);
}

// Старт таймера
function startTimer() {
    if (isRunningTimer) return;
    isRunningTimer = true;
    const startTime = Date.now() - elapsedTimer;
    intervalTimer = setInterval(() => {
        elapsedTimer = Date.now() - startTime;
        updateTimerDisplay();
    }, 10);
}

// Ресет таймера
function resetTimer() {
    clearInterval(intervalTimer);
    isRunningTimer = false;
    elapsedTimer = 0;
    updateTimerDisplay();
}