const ghostSettingsBlink = document.querySelector(".setting-choose-ghost-blink");
const applyButtonBlink = document.querySelectorAll(".applyButton-blink");
const blinkTypeText = document.querySelector(".blink-type");

// Обработчик выбора призрака
document.querySelector(".choose-ghost-blink").addEventListener("click", () => {
    overlay.style.display = "block";
    ghostSettingsBlink.style.display = "block";
});

// Слушать кнопку мерцаний призрака
applyButtonBlink.forEach(but => {
    but.addEventListener("click", () => {
        overlay.style.display = "none";
        ghostSettingsBlink.style.display = "none";

        let choosedGhostBlink = but.id

        document.querySelectorAll(".segment").forEach(el => {
            el.remove();
        })

        if (["Обычный", "1 сбитый", "2 сбитый"].includes(choosedGhostBlink)) {
            settings_data[3].disabled = false;
        } else {
            settings_data[3].disabled = true;
        }

        blinkinsData = blinkinsDataAll[choosedGhostBlink];

        animationDuration = blinkinsData.reduce((sum, [lengthRatio]) => sum + lengthRatio, 0).toFixed(2);
        createLine();

        arrow.style.animation = `moveArrow ${animationDuration}s linear infinite`;
        arrow.style.animationPlayState = "paused";

        if (startButton.className.indexOf("fullHidden") >= 0) {
            restartButton.click();
        }

        blinkTypeText.textContent = `${choosedLanguage["Тип мерцаний:"]} ${choosedLanguage[choosedGhostBlink]}`;
        segmentsList = document.querySelectorAll(".segment");

        updateURL({ ghostBlink: choosedGhostBlink })
    });
});
