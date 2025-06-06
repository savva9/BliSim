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
        } else {
            combo = 0;
        }

        photosText.textContent = `Фото: ${photos}`;
        comboText.textContent = `Комбо: ${combo}`;
        
        if (photoAudio && !isPaused && canClick && !isSleep) {
            photoAudio.play();
            isSleep = true;
            setTimeout(() => {
                isSleep = false;
                console.log(photoAudioVolume[choosedPhotoAudio][1])
            }, photoAudioVolume[choosedPhotoAudio][1] * 1000)
        }
    });
})
