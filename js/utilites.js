// Массив данных для расчета продолжительности и описания сегментов

const blinkinsDataAll = {
    "Обычный": [
        [0.220, 1, ""],
        [0.380, 0, ""],
        [0.183, 1, ""],
        [0.277, 0, ""],
        [0.080, 1, ""],
        [0.923, 0, "Длиннейшее пропадание"],
        [0.283, 1, "soshyrey"],
        [0.540, 0, ""],
        [0.200, 1, ""],
        [0.100, 0, ""],
        [0.163, 1, ""],
        [0.317, 0, ""],
        [0.251, 1, "dont lucky"],
        [0.449, 0, ""],
        [0.183, 1, ""],
        [0.640, 0, ""],
        [0.220, 1, ""],
        [0.229, 0, ""],
        [0.100, 1, ""],
        [0.263, 0, ""]
    ],
    "Фантом": [
        [0.220, 1, ""],
        [1.649, 0, ""],
        [0.180, 1, ""],
        [1.020, 0, ""],
        [0.083, 1, ""],
        [1.520, 0, ""],
        [0.283, 1, "Длиннейшее появление"],
        [1.517, 0, ""],
        [0.200, 1, "22 секунда охоты"],
        [1.083, 0, ""],
        [0.160, 1, ""],
        [1.540, 0, ""],
        [0.251, 1, ""],
        [1.169, 0, ""],
        [0.180, 1, ""],
        [1.823, 0, "Длиннейшее пропадание"],
        [0.220, 1, ""],
        [1.271, 0, ""],
        [0.100, 1, ""],
        [1.003, 0, ""],
    ],
    "Деоген": [
        [0.251, 1, ""],
        [0.164, 0, ""],
        [0.226, 1, ""],
        [0.311, 0, "Длиннейшее пропадание"],
        [0.273, 1, "Длиннейшее появление"],
        [0.303, 0, ""],
        [0.247, 1, ""],
        [0.068, 0, ""],
        [0.271, 1, ""],
        [0.204, 0, ""],
    ],
    "Они": [
        [0.1, 1, ""],
        [1, 0, ""],
        [0.1, 1, ""],
        [1, 0, ""],
        [0.1, 1, ""],
        [1, 0, ""],
        [1, 1, ""],
        [0.75, 0, ""],
        [1, 1, ""],
        [0.75, 0, ""],
        [1, 1, ""],
        [1, 0, ""],
        [0.1, 1, ""],
        [1, 0, ""],
        [0.1, 1, ""],
        [1, 0, ""],
        [0.1, 1, ""],
        
    ],
    "1 сбитый": [
        [0.220, 1, ""],
        [0.780, 0, "Длиннейшее пропадание"],
        [0.183, 1, "1ый обакэ (12 мерцание)"],
        [0.640, 0, ""],
        [0.080, 1, ""],
        [0.220, 0, ""],
        [0.283, 1, ""],
        [0.200, 0, ""],
        [0.200, 1, ""],
        [0.500, 0, ""],
        [0.163, 1, ""],
        [0.660, 0, ""],
        [0.251, 1, ""],
        [0.200, 0, ""],
        [0.180, 1, ""],
        [0.183, 0, ""],
        [0.220, 1, ""],
        [0.383, 0, ""],
        [0.097, 1, ""],
        [0.363, 0, ""]
    ],
    "2 сбитый": [
        [0.280, 1, ""],
        [0.540, 0, ""],
        [0.203, 1, ""],
        [0.249, 0, ""],
        [0.163, 1, ""],
        [0.200, 0, ""],
        [0.251, 1, ""],
        [0.351, 0, ""],
        [0.180, 1, ""],
        [0.280, 0, ""],
        [0.223, 1, ""],
        [0.777, 0, "Длиннейшее пропадание"],
        [0.103, 1, ""],
        [0.720, 0, ""],
        [0.220, 1, ""],
        [0.083, 0, ""],
        [0.180, 1, ""],
        [0.300, 0, ""],
        [0.080, 1, ""],
        [0.620, 0, ""]
    ],
}

let blinkinsData = blinkinsDataAll["Обычный"];

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