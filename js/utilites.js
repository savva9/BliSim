// Массив данных для расчета продолжительности и описания сегментов
const blinkinsData = [
    [0.217, 1, ""],
    [0.379, 0, ""],
    [0.179, 1, "1ый обакэ (12 мерцаний)"],
    [0.275, 0, ""],
    [0.079, 1, ""],
    [0.917, 0, "Самое долгое пропадание"],
    [0.279, 1, "soshyrey"],
    [0.542, 0, ""],
    [0.200, 1, ""],
    [0.096, 0, ""],
    [0.154, 1, ""],
    [0.317, 0, ""],
    [0.254, 1, "dont lucky, 2ой обакэ (27 мерцаний)"],
    [0.446, 0, ""],
    [0.179, 1, ""],
    [0.638, 0, ""],
    [0.221, 1, "3ий обакэ (39 мерцаний)"],
    [0.225, 0, ""],
    [0.096, 1, ""],
    [0.258, 0, ""]
];

// Установка авторов
const madeBy = document.querySelector(".made-by");
madeBy.textContent += Math.round(Math.random()) ? "savva_9 & kv1nk" : "kv1nk & savva_9";

// Функция sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Отключаем контекстное меню ПКМ
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

const overlay = document.querySelector(".overlay");