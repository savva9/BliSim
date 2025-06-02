const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");

// Обработчик кнопки старта
startButton.addEventListener("click", async () => {
    startTimer();
    trackArrowPosition();
    
    isPaused = false;
    canClick = true;

    startButton.classList.add("fullHidden");
    restartButton.classList.remove("fullHidden");

    if (settings_data[2].checked === true) {
        await sleep(1000);
    }

    arrow.style.animationPlayState = "running";
});

// Обработчик кнопки рестарта
restartButton.addEventListener("click", async () => {
    arrow.style.animation = 'none';
    arrow.offsetHeight;
    
    resetTimer();
    startTimer();
    
    photos = 0;
    combo = 0;

    photosText.textContent = `Фото: ${photos}`;
    comboText.textContent = `Комбо: ${combo}`;

    if (settings_data[2].checked === true) {
        await sleep(1000);
    }

    arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
    arrow.style.animationPlayState = 'running';
});
