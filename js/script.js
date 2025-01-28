// Массив данных для расчета продолжительности и описания сегментов
const blinkinsData = [
    [0.217, 1, ""],
    [0.379, 0, ""],
    [0.179, 1, "1st obake (12 blink)"],
    [0.275, 0, ""],
    [0.079, 1, ""],
    [0.917, 0, "longest invisible"],
    [0.279, 1, "soshyrey"],
    [0.542, 0, ""],
    [0.200, 1, ""],
    [0.096, 0, ""],
    [0.154, 1, ""],
    [0.317, 0, ""],
    [0.254, 1, "dont lucky, 2nd obake (27 blink)"],
    [0.446, 0, ""],
    [0.179, 1, ""],
    [0.638, 0, ""],
    [0.221, 1, "3rd obake (39 blink)"],
    [0.225, 0, ""],
    [0.096, 1, ""],
    [0.258, 0, ""]
];

// Получение элементов интерфейса
const timeDisplay = document.querySelector(".timer");
const stripeContainer = document.getElementById("stripe");
const square = document.getElementById("square");
const arrow = document.querySelector(".arrow");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button")
const photosText = document.querySelector(".photo");
const settings_data = document.querySelectorAll("#setting");
const madeBy = document.querySelector(".made-by");
const settingsIcon = document.querySelector(".settings");
const settingsMenu = document.querySelector(".settings-menu");
const ghostSettings = document.querySelector(".setting-choose-ghost");
const overlay = document.createElement("div");
const applyButton = document.getElementById('applyButton');
const choosedGhostImg = document.querySelector(".selected-ghost");
const customUrlInput = document.querySelector(".custom-url");
const testImg = document.querySelector(".test-img");
const comboText = document.querySelector(".combo");
const clickers = document.querySelectorAll(".clicker");
const FAQ = document.querySelector(".FAQ");
const FAQButton = document.querySelector(".FAQ-button")

// Переменные для управления состоянием
let choosedGhost = ["None", ""];
let canClick = false;
let photos = 0;
let combo = 0;
let isPaused = true;
let selectedGhost = null;
let intervalTimer;
let elapsedTimer = 0;
let isRunningTimer = false;
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Расчет общей продолжительности анимации
const animationDuration = blinkinsData.reduce((sum, [lengthRatio]) => sum + lengthRatio, 0).toFixed(2);
arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
arrow.style.animationPlayState = "paused";

// Инициализация настроек
settings_data[0].checked = true;
settings_data[1].checked = true;
settings_data[2].checked = false;

// Функция sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Добавление сегментов на полосу
blinkinsData.forEach(([lengthRatio, colorFlag, description]) => {
    const segment = document.createElement("div");
    segment.classList.add("segment");

    // Рассчитываем ширину сегмента
    const segmentWidth = lengthRatio * 1000;
    segment.style.width = `${segmentWidth}px`;
    segment.style.backgroundColor = colorFlag === 1 ? "black" : "white";

    // Создаем и добавляем подсказку
    const fullDescription = [
        `${lengthRatio * 1000}ms`,
        colorFlag ? "Visible" : "Invisible",
        description
    ];

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.style.bottom = description ? "-90px" : "-70px";
    tooltip.innerHTML = fullDescription.join('<br>');

    segment.appendChild(tooltip);

    // Показываем подсказку при наведении
    segment.addEventListener("mouseenter", () => tooltip.style.display = "block");
    segment.addEventListener("mouseleave", () => tooltip.style.display = "none");

    stripeContainer.appendChild(segment);
});

// Установка авторов
madeBy.textContent += Math.round(Math.random()) ? "savva_9 & kv1nk" : "kv1nk & savva_9";

// Функция обновления позиции стрелки
function updateArrowPosition() {
    const arrowPosition = arrow.getBoundingClientRect().left - arrow.offsetWidth / 2;
    let currentColor = null;
    let accumulatedWidth = 0;

    // Проходим по всем сегментам и проверяем, под каким сегментом находится стрелка
    document.querySelectorAll(".segment").forEach(segment => {
        const segmentWidth = segment.offsetWidth + 0.5;

        if (arrowPosition >= accumulatedWidth && arrowPosition <= accumulatedWidth + segmentWidth) {
            currentColor = segment.style.backgroundColor;

            // Обновляем фон квадрата
            if (currentColor === "white") {
                square.style.backgroundImage = "none";
                square.style.backgroundColor = "#4f5258";
            } else {
                if (choosedGhost[0] === "None") {
                    square.style.backgroundImage = "none";
                    square.style.backgroundColor = "black";
                } else {
                    square.style.backgroundImage = `url('${choosedGhost[1]}')`;
                    square.style.backgroundSize = "contain";
                    square.style.backgroundRepeat = "no-repeat";
                    square.style.backgroundPosition = "center";
                    square.style.overflow = "visible";
                }
            }
        }
        accumulatedWidth += segmentWidth;
    });
}

// Функция отслеживания позиции стрелки
function trackArrowPosition() {
    updateArrowPosition();
    requestAnimationFrame(trackArrowPosition);
}

// Таймер
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(1, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 100)).padStart(1, '0');
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

// Обработчик клика по телу страницы
clickers.forEach(clicker => {
    clicker.addEventListener("mousedown", () => {
        console.log(123)
        if (square.style.backgroundColor === "black" && !isPaused && canClick) {
            photos++;
            combo++;
            square.style.backgroundColor = "white";
        } else if (square.style.backgroundImage !== "none" && !isPaused && canClick) {
            photos++;
            combo++;
        } else {
            combo = 0;
        }
        photosText.textContent = `Фото: ${photos}`;
        comboText.textContent = `Комбо: ${combo}`;
    });
})


// Функции для скрытия и отображения полосы и стрелки
const hideStripeAndArrow = () => {
    stripeContainer.classList.add("hidden");
    arrow.classList.add("hidden");
};

const showStripeAndArrow = () => {
    stripeContainer.classList.remove("hidden");
    arrow.classList.remove("hidden");
};

// Обработчик меню настроек
settingsIcon.addEventListener("click", () => {
    settingsMenu.style.display = (settingsMenu.style.display === "none" || settingsMenu.style.display === "") ? "block" : "none";
});
settingsIcon.click();

settingsMenu.addEventListener("change", () => {
    settings_data[0].checked ? stripeContainer.classList.remove("hidden") : stripeContainer.classList.add("hidden");
    settings_data[1].checked ? arrow.classList.remove("hidden") : arrow.classList.add("hidden");
    showGhost = settings_data[1].checked;
});

// Функции для отображения и скрытия настроек выбора призраков
function showGhostSettings() {
    overlay.style.display = 'block';
    ghostSettings.style.display = 'block';
}

function hideGhostSettings() {
    overlay.style.display = 'none';
    ghostSettings.style.display = 'none';
}

// Обработчик выбора призрака
document.querySelector(".choose-ghost").addEventListener("click", () => {
    showGhostSettings();
    canClick = false;
    customUrlInput.value = "";
    applyButton.disabled = true;
});

// Обработчик кликов на изображения призраков
document.querySelectorAll('.setting-ghost').forEach(ghost => {
    ghost.addEventListener('click', () => {
        if (selectedGhost) {
            selectedGhost.classList.remove('selected');
        }
        ghost.classList.add('selected');
        selectedGhost = ghost;
        if (ghost.alt != "Custom") {
            applyButton.disabled = false;
            customUrlInput.classList.add("fullHidden");
            ghostSettings.style.height = "45%";
        } else {
            applyButton.disabled = true;
            customUrlInput.classList.remove("fullHidden");
            ghostSettings.style.height = "50%";
        }
    });
    if (ghost.alt === "Custom") {
        customUrlInput.addEventListener("input", () => {
            if (customUrlInput.value.length > 0) {
                applyButton.disabled = true;
                const img = new Image();
                img.onload = () => {
                    applyButton.disabled = false;
                };
                img.onerror = () => {
                    applyButton.disabled = true;
                };
                img.src = customUrlInput.value;
            } else {
                applyButton.disabled = true;
            }
        });
    }
});

// Обработчик кнопки "Применить" для выбора призрака
applyButton.addEventListener('click', () => {
    if (selectedGhost) {
        hideGhostSettings();
        choosedGhost = [selectedGhost.alt, selectedGhost.src];
        if (choosedGhost[0] === "Custom") {
            choosedGhost[1] = customUrlInput.value;
        }
        choosedGhostImg.src = choosedGhost[1];
        canClick = true;
    }
});

// Показать FAQ
FAQButton.addEventListener("click", () => {
    FAQ.style.display = "block";
    overlay.style.display = "block";
});

// Закрытие FAQ при клике вне области меню
document.addEventListener("click", (event) => {
    const isClickInsideFAQ = FAQ.contains(event.target);
    const isClickOnFAQButton = FAQButton.contains(event.target);

    if (!isClickInsideFAQ && !isClickOnFAQButton) {
        FAQ.style.display = "none";
        overlay.style.display = "none";
    }
});
