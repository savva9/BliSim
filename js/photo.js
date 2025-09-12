const clickers = document.querySelectorAll(".clicker");
const photosText = document.querySelector(".photo");
const comboText = document.querySelector(".combo");
const stripeContainer = document.getElementById("stripe");
const square = document.getElementById("square");

let photos = 0;
let combo = 0;
let isPaused = true;
let canClick = false;
let isSleep = false;

// Обработчик клика по телу страницы
clickers.forEach(clicker => {
    clicker.addEventListener("mousedown", () => {
        if ((square.style.backgroundColor === "black" || square.style.backgroundColor === "white") && !isPaused && canClick && !isSleep) {
            photos++;
            combo++;
            square.style.backgroundColor = "white";
        } else if (square.style.backgroundImage !== "none" && !isPaused && canClick && !isSleep) {
            photos++;
            combo++;
        } else if (isSleep === false) { 
            combo = 0;
        }

        photosText.textContent = `${choosedLanguage["Фото:"]} ${photos}`;
        comboText.textContent = `${choosedLanguage["Комбо:"]} ${combo}`;

        if (photoAudio && !isPaused && canClick && !isSleep && (photoAudioSettings[0].checked || photoAudioSettings[1].checked)) {
            if (photoAudioSettings[0].checked) {
                photoAudio.play();
            }
            if (photoAudioSettings[1].checked) {
                isSleep = true;
                setTimeout(() => {
                    isSleep = false;
                }, photoAudioVolume[choosedPhotoAudio][1] * 1000)
            }
        }
    });
})
