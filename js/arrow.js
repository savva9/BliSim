const arrow = document.querySelector(".arrow");
let blinkCount = 0;
let lastColor = "white";
let ghostGender = null;
let ghostChangeID = -1;

// Расчет общей продолжительности анимации
let animationDuration = blinkinsData.reduce((sum, [lengthRatio]) => sum + lengthRatio, 0).toFixed(2);
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
                if (lastColor === "white") {
                    blinkCount++;
                    console.log(blinkCount)
                    if ([12, 27, 39, 54, 62, 80, 105, 120].includes(blinkCount)) {
                        ghostChangeID++;

                        if (ghostChangeID >= ghostGender.length) {
                            ghostChangeID = 0;
                        }
                    }
                }
                
                if (choosedGhost[0] === "None") {
                    square.style.backgroundImage = "none";

                    if ([12, 27, 39, 54, 62, 80, 105, 120].includes(blinkCount) && settings_data[3].checked && settings_data[3].disabled === false) {
                        square.style.backgroundColor = "white";
                    } else {
                        square.style.backgroundColor = "black";
                    }
                } else {
                    if (choosedGhost[0] == "Custom") {
                        square.style.backgroundImage = `url('${choosedGhost[1]}')`;
                        square.style.backgroundSize = "contain";
                        square.style.backgroundRepeat = "no-repeat";
                        square.style.backgroundPosition = "center";
                        square.style.overflow = "visible";
                        
                        if ([12, 27, 39, 54, 62, 80, 105, 120].includes(blinkCount) && settings_data[3].checked && settings_data[3].disabled === false) {
                            square.style.transform = 'rotate(180deg)';
                        } else {
                            square.style.transform = 'rotate(0deg)';
                        }

                    } else {
                        if ([12, 27, 39, 54, 62, 80, 105, 120].includes(blinkCount) && settings_data[3].checked && settings_data[3].disabled === false) {
                            changeGhostSRC = document.querySelector(`img[alt="${ghostGender[ghostChangeID]}"]`).src
                            square.style.backgroundImage = `url('${changeGhostSRC}')`;;
                        } else {
                            square.style.backgroundImage = `url('${choosedGhost[1]}')`;
                        }
                        square.style.backgroundSize = "contain";
                        square.style.backgroundRepeat = "no-repeat";
                        square.style.backgroundPosition = "center";
                        square.style.overflow = "visible";
                    }
                }
                if (blinkCount === 120) {
                    blinkCount = 0
                }
            }
            
            // Обновляем последний цвет
            lastColor = currentColor;
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
