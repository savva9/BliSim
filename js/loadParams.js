// Получить параметры
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};

    for (const [key, value] of params.entries()) {
        if (value.toLowerCase() === "true") {
            result[key] = true;
        } else if (value.toLowerCase() === "false") {
            result[key] = false;
        } 
        else {
            result[key] = value;
        }
    }

    return result;
}

// При загрузке страницы обновляем чекбоксы в соответствии с URL
document.addEventListener("DOMContentLoaded", () => {
    let urlSettings = getURLParams();
    const saveSettingsCheckbox = document.querySelector(".saveSettings");

    // Устанавливаем состояние галочки из URL
    isSaveSettings = urlSettings.saveSettings === true;
    saveSettingsCheckbox.checked = isSaveSettings;

    if (!isSaveSettings) {
        window.history.pushState({}, "", window.location.pathname);
        urlSettings = {};
    }

    // Загружаем настройки только если галочка была включена или есть параметры
    const shouldLoadSettings = isSaveSettings || Object.keys(urlSettings).length > 0;
    
    const mergedSettings = shouldLoadSettings ? {
        ...defaultSettings,
        ...urlSettings
    } : defaultSettings;

    // Применяем настройки
    for (let i = 0; i < 4; i++) {
        if (mergedSettings[`setting${i+1}`]) {
            settings_data[i].click();
        }
    }

    document.querySelector(`.setting-photo[alt="${mergedSettings.photoT}"]`).click();
    photoAudioSettings[0].checked = mergedSettings["photo1"];
    photoAudioSettings[1].checked = mergedSettings["photo2"];

    document.querySelector(`input[value="${mergedSettings.ghostBlink}"]`).click();

    document.querySelector(`.setting-ghost[alt="${mergedSettings.ghostModel}"]`).click();
    customUrlInput.value = mergedSettings.customUrl;
    applyButton.disabled = false;
    applyButton.click();

    if (mergedSettings.start) {
        startButton.click();
    }

    if (!isSaveSettings) {
        const ghostImages = document.querySelectorAll('.setting-ghost:not([alt="Custom"]):not([alt="None"])');
        const randomGhost =  ghostImages[Math.floor(Math.random() * ghostImages.length)];
        randomGhost.click();
        applyButton.click();
    }
});

// Изменение сохранения настроек
document.querySelector(".saveSettings").addEventListener("click", () => {
    isSaveSettings = !isSaveSettings;
})