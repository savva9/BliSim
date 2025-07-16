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
madeBy.innerHTML += Math.round(Math.random()) ? "<a href="https://steamcommunity.com/id/savva_9/" target="_blank">savva_9</a> & <a href="https://steamcommunity.com/id/kv1nk_/" target="_blank">kv1nk</a>" : "<a href="https://steamcommunity.com/id/kv1nk_/" target="_blank">kv1nk</a> & <a href="https://steamcommunity.com/id/savva_9/" target="_blank">savva_9</a>";

// Функция sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Отключаем контекстное меню ПКМ
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

// Дефолтные настроки BliSim
const defaultSettings = {
    setting1: true, setting2: true, setting3: false, setting4: false,
    photoT: "None", photo1: true, photo2: true,
    ghostBlink: "Обычный",
    ghostModel: "None", customUrl: "",
    start: false, saveSettings: false
};

// Сохранять ли настройки
let isSaveSettings = false;

// Обновление настроек (ссылки)
function updateURL(params) {
    const currentParams = new URLSearchParams(window.location.search);
    
    if (isSaveSettings) {
        currentParams.set("saveSettings", "true");
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== defaultSettings[key]) {
                currentParams.set(key, value);
            } else {
                currentParams.delete(key);
            }
        });
    } else {
        currentParams.delete("saveSettings");
    }
    
    const newURL = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState({}, "", newURL);
}

// Обработчик изменения состояния кнопки сохранения настроек
document.querySelector(".saveSettings").addEventListener("change", function() {
    isSaveSettings = this.checked;
    
    if (isSaveSettings) {
        const currentSettings = {
            setting1: settings_data[0].checked,
            setting2: settings_data[1].checked,
            setting3: settings_data[2].checked,
            setting4: settings_data[3].checked,
            photoT: choosedPhotoAudio || "None",
            photo1: photoAudioSettings[0].checked,
            photo2: photoAudioSettings[1].checked,
            ghostBlink: document.querySelector(".blink-type").textContent.replace("Тип мерцаний: ", ""),
            ghostModel: choosedGhost[0] || "None",
            customUrl: customUrlInput.value || "",
            saveSettings: true
        };
        updateURL(currentSettings);
    } else {
        window.history.pushState({}, "", window.location.pathname);
    }
});

// Затемнение
const overlay = document.querySelector(".overlay");