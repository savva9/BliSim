const clickers = document.querySelectorAll(".clicker");
const photosText = document.querySelector(".photo");
const comboText = document.querySelector(".combo");
const stripeContainer = document.getElementById("stripe");
const square = document.getElementById("square");
const clickDelayCheckbox = document.querySelector(".set-clickDelay-setting");

let photos = 0;
let combo = 0;
let isPaused = true;
let canClick = false;
let isSleep = false;

const HOLD_DELAY = 400;

let holdTimer = null;
let photoTaken = false;

clickDelayCheckbox.addEventListener("click", () => {
    updateURL({["clickDelay"]: clickDelayCheckbox.checked});
})

/* Единая функция фото */
function makePhoto() {
    if ((square.style.backgroundColor === "black" || square.style.backgroundColor === "white") && !isPaused && canClick && !isSleep) {
        photos++;
        combo++;
        square.style.backgroundColor = "white";
    } else if (square.style.backgroundImage !== "none" && !isPaused && canClick && !isSleep) {
        photos++;
        combo++;
    } else if (!isSleep) {
        combo = 0;
    }

    photosText.textContent = `${choosedLanguage["Фото:"]} ${photos}`;
    comboText.textContent = `${choosedLanguage["Комбо:"]} ${combo}`;

    if (
        photoAudio &&
        !isPaused &&
        canClick &&
        !isSleep &&
        (photoAudioSettings[0].checked || photoAudioSettings[1].checked)
    ) {
        if (photoAudioSettings[0].checked) {
            photoAudio.play();
        }
        if (photoAudioSettings[1].checked) {
            isSleep = true;
            setTimeout(() => {
                isSleep = false;
            }, photoAudioVolume[choosedPhotoAudio][1] * 1000);
        }
    }
}

/* ОБРАБОТЧИКИ */
clickers.forEach(clicker => {

    clicker.addEventListener("mousedown", () => {

        /* режим удержания ВКЛЮЧЕН */
        if (clickDelayCheckbox.checked) {
            photoTaken = false;

            holdTimer = setTimeout(() => {
                photoTaken = true;
                makePhoto(); // удержание 400 мс
            }, HOLD_DELAY);

        } else {
            /* обычный клик */
            makePhoto();
        }
    });

    clicker.addEventListener("mouseup", () => {

        if (!clickDelayCheckbox.checked) return;

        clearTimeout(holdTimer);

        if (!photoTaken) {
            makePhoto(); // отпускание раньше 400 мс
        }
    });

    clicker.addEventListener("mouseleave", () => {
        clearTimeout(holdTimer);
    });

});
