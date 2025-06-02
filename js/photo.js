const clickers = document.querySelectorAll(".clicker");
const photosText = document.querySelector(".photo");
const comboText = document.querySelector(".combo");
const stripeContainer = document.getElementById("stripe");
const square = document.getElementById("square");

let photos = 0;
let combo = 0;
let isPaused = true;
let canClick = false;

// Обработчик клика по телу страницы
clickers.forEach(clicker => {
    clicker.addEventListener("mousedown", () => {
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
