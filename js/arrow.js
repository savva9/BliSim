const arrow = document.querySelector(".arrow");

// Расчет общей продолжительности анимации
const animationDuration = blinkinsData.reduce((sum, [lengthRatio]) => sum + lengthRatio, 0).toFixed(2);
arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
arrow.style.animationPlayState = "paused";

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
                console.log(choosedGhost)
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

// Функции для скрытия и отображения полосы и стрелки
const hideStripeAndArrow = () => {
    stripeContainer.classList.add("hidden");
    arrow.classList.add("hidden");
};

const showStripeAndArrow = () => {
    stripeContainer.classList.remove("hidden");
    arrow.classList.remove("hidden");
};
