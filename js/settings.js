const settings_data = document.querySelectorAll("#setting");
const choosedGhostImg = document.querySelector(".selected-ghost");
const settingsIcon = document.querySelector(".settings");
const settingsMenu = document.querySelector(".settings-menu");

// Обработчик меню настроек
settingsIcon.addEventListener("click", () => {
    settingsMenu.style.display = (settingsMenu.style.display === "none" || settingsMenu.style.display === "") ? "block" : "none";
});
settingsIcon.click();

settingsMenu.addEventListener("change", () => {
    settings_data[0].checked ? stripeContainer.classList.remove("hidden") : stripeContainer.classList.add("hidden");
    settings_data[0].checked ? timeDisplay.style.top = "120px" : timeDisplay.style.top = "-20px";
    settings_data[0].checked ? settings_data[1].disabled = false : settings_data[1].disabled = true;
    settings_data[1].checked ? arrow.classList.remove("hidden") : arrow.classList.add("hidden");
    showGhost = settings_data[1].checked;

    settings_data.forEach((setting, i) => {
        const customObject = {
            [`setting${i + 1}`]: setting.checked
        };
        updateURL(customObject);
    });
});