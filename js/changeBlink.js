const ghostSettingsBlink = document.querySelector(".setting-choose-ghost-blink");
const applyButtonBlink = document.querySelectorAll('.applyButton-blink');

// Обработчик выбора призрака
document.querySelector(".choose-ghost-blink").addEventListener("click", () => {
    overlay.style.display = 'block';
    ghostSettingsBlink.style.display = 'block';
});

applyButtonBlink.forEach(but => {
    but.addEventListener('click', () => {
        console.log(but);
        overlay.style.display = 'none';
        ghostSettingsBlink.style.display = 'none';

        let choosedGhostBlink = but.value

        document.querySelectorAll(".segment").forEach(el => {
            el.remove();
        })

        blinkinsData = blinkinsDataAll[choosedGhostBlink];
        console.log(blinkinsData);
        createLine();
    });
})


