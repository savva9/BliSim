// Суммируем все значения из первого элемента массива
const blinkinsData = [
    [0.217, 1, ""],
    [0.379, 0, ""],
    [0.179, 1, "1st obake"],
    [0.275, 0, ""],
    [0.079, 1, ""],
    [0.917, 0, "longest invisible 2"],
    [0.279, 1, "soshyrey"],
    [0.542, 0, ""],
    [0.200, 1, ""],
    [0.096, 0, ""],
    [0.154, 1, ""],
    [0.317, 0, ""],
    [0.254, 1, "don’t lucky"],
    [0.446, 0, ""],
    [0.179, 1, ""],
    [0.638, 0, ""],
    [0.221, 1, "3rd obake"],
    [0.225, 0, ""],
    [0.096, 1, ""],
    [0.258, 0, ""]
];
const stripeContainer = document.getElementById("stripe");
const square = document.getElementById('square');
const arrow = document.querySelector(".arrow");
const animationDuration = blinkinsData.reduce((sum, [lengthRatio]) => sum + lengthRatio, 0).toFixed(2);
const startButton = document.querySelector(".start-button");
const photosText = document.querySelector(".photo");
let choosedGhost = ["None", ""];
let canClick = false;
let photos = 0;
let isPaused = true;
arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
arrow.style.animationPlayState = "paused";

const settings_data = document.querySelectorAll("#setting");
settings_data[0].checked = true;
settings_data[1].checked = true;

// Получаем контейнер для полоски
blinkinsData.forEach(([lengthRatio, colorFlag, description]) => {
    const segment = document.createElement("div");
    segment.classList.add("segment");

    // Рассчитываем ширину сегмента на основе первого значения, умноженного на 1000
    const segmentWidth = lengthRatio * 1000;
    segment.style.width = `${segmentWidth}px`;
    segment.style.backgroundColor = colorFlag === 1 ? "black" : "white";

    // Создаем подсказку
    const fullDescription = [
        `${lengthRatio * 1000}ms`,
        colorFlag ? "Visible" : "Invisible",
        description
    ];

    if (fullDescription) {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.style.bottom = description ? "-90px" : "-70px"

        // Разбиваем описание на строки с помощью <br>
        tooltip.innerHTML = fullDescription.join('<br>'); // Разделяем строки

        segment.appendChild(tooltip);

        // Показываем подсказку при наведении
        segment.addEventListener("mouseenter", () => {
            tooltip.style.display = "block";
        });
        segment.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    }

    stripeContainer.appendChild(segment);
});

// Авторы
const madeBy = document.querySelector(".made-by")
madeBy.textContent += Math.round(Math.random()) ? "savva_9 & kv1nk" : "kv1nk & savva_9";

// Обновляем позицию стрелки
function updateArrowPosition() {
    const arrowPosition = arrow.getBoundingClientRect().left - arrow.offsetWidth / 2; // Учитываем центр стрелки
    let currentColor = null;

    // Пройдем по всем сегментам и определим, под каким сегментом стрелка
    let accumulatedWidth = 0;

    document.querySelectorAll(".segment").forEach(segment => {
        const segmentWidth = segment.offsetWidth;

        // Проверим, находится ли стрелка в пределах текущего сегмента
        if (arrowPosition >= accumulatedWidth && arrowPosition <= accumulatedWidth + segmentWidth) {
            currentColor = segment.style.backgroundColor;

            // Обновляем фон для элемента square
            if (currentColor === "white") {
                square.style.backgroundImage = "none";
                square.style.backgroundColor = "#4f5258"; // Устанавливаем фон в случае белого цвета
            } else {
                if (choosedGhost[0] === "None") {
                    square.style.backgroundImage = "none";
                    square.style.backgroundColor = "black"; // Черный квадрат
                } else {
                    square.style.backgroundImage = `url('${choosedGhost[1]}')`;
                    square.style.backgroundSize = "contain"; // Изображение не обрезается
                    square.style.backgroundRepeat = "no-repeat";
                    square.style.backgroundPosition = "center";
                    square.style.overflow = "visible";
                }
            }
        }
        accumulatedWidth += segmentWidth;
    });
}


// Настроим функцию, которая будет обновлять позицию стрелки на каждом кадре анимации
function trackArrowPosition() {
    updateArrowPosition();
    requestAnimationFrame(trackArrowPosition);
}

startButton.addEventListener("click", () => {
    if (isPaused) {
        arrow.style.animationPlayState = "running";
        trackArrowPosition();
        isPaused = false;
        startButton.value = "Рестарт"
        canClick = true
    } else {
        arrow.style.animation = 'none'; // Останавливаем анимацию
        arrow.offsetHeight; // Принудительное пересчитывание для сброса стилей
        arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
        arrow.style.animationPlayState = 'running'; // Перезапускаем анимацию
    }
    photos = -1;
});


document.querySelector("body").addEventListener("click", () => {
    // Проверяем, является ли квадрат черным и нет ли паузы
    if (square.style.backgroundColor === "black" && !isPaused && canClick) {
        photos++;
        photosText.textContent = `Фото: ${photos}`;

        square.style.backgroundColor = "white"; // Короткое изменение цвета
    }
    else if (square.style.backgroundImage != "none" && !isPaused && canClick) {
        photos++;
        photosText.textContent = `Фото: ${photos}`;
    }
});


const hideStripeAndArrow = () => {
    stripeContainer.classList.add("hidden");
    arrow.classList.add("hidden");
};

const showStripeAndArrow = () => {
    stripeContainer.classList.remove("hidden");
    arrow.classList.remove("hidden");
};

const settingsIcon = document.querySelector(".settings");
const settingsMenu = document.querySelector(".settings-menu");

// Обработчик события для отображения/скрытия меню
settingsIcon.addEventListener("click", () => {
    // Проверяем, скрыто ли меню
    if (settingsMenu.style.display === "none" || settingsMenu.style.display === "") {
        settingsMenu.style.display = "block"; // Показываем меню
    } else {
        settingsMenu.style.display = "none"; // Скрываем меню
    }
});


document.querySelector(".settings-menu").addEventListener("change", () => {
    settings_data[0].checked ? stripeContainer.classList.remove("hidden") : stripeContainer.classList.add("hidden");
    settings_data[1].checked ? arrow.classList.remove("hidden") : arrow.classList.add("hidden");
    showGhost = settings_data[2].checked;
});




const ghostSettings = document.querySelector(".setting-choose-ghost");
const overlay = document.createElement('div');
overlay.classList.add('overlay');
const applyButton = document.getElementById('applyButton');
document.body.appendChild(overlay);

function showGhostSettings() {
    overlay.style.display = 'block'; // Показываем затемнение фона
    ghostSettings.style.display = 'block'; // Показываем окно выбора призраков
}

function hideGhostSettings() {
    
    overlay.style.display = 'none'; // Скрываем затемнение
    ghostSettings.style.display = 'none'; // Скрываем окно
}
document.querySelector(".choose-ghost").addEventListener("click", () => {
    showGhostSettings();
    canClick = false;
});


const ghosts = document.querySelectorAll('.setting-ghost');
let selectedGhost = null;

ghosts.forEach(ghost => {
    ghost.addEventListener('click', () => {
        // Если есть выбранный призрак, убираем обводку с плавным эффектом
        if (selectedGhost) {
            selectedGhost.classList.remove('selected');
        }

        // Добавляем обводку на текущее изображение с плавным эффектом
        ghost.classList.add('selected');

        // Обновляем выбранный призрак
        selectedGhost = ghost;
    });
});



// Обработчик клика по изображению призрака
document.querySelectorAll('.setting-ghost').forEach(ghost => {
    ghost.addEventListener('click', () => {
        // Убираем обводку с предыдущего выбранного призрака
        if (selectedGhost) {
            selectedGhost.classList.remove('selected');
        }

        // Добавляем обводку на текущее изображение
        ghost.classList.add('selected');
        
        // Обновляем выбранного призрака
        selectedGhost = ghost;
        
        // Разблокируем кнопку
        applyButton.disabled = false;
    });
});

const choosedGhostImg = document.querySelector(".selected-ghost"); 

// Обработчик клика по кнопке "Применить"
applyButton.addEventListener('click', () => {
    if (selectedGhost) {
        hideGhostSettings()
        choosedGhost = [selectedGhost.alt, selectedGhost.src]
        choosedGhostImg.src = selectedGhost.src
        canClick = true
    }
});
