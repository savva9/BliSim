const settings_data = document.querySelectorAll("#setting");
const choosedGhostImg = document.querySelector(".selected-ghost");
const settingsIcon = document.querySelector(".settings");
const settingsMenu = document.querySelector(".settings-menu");

// Инициализация настроек
settings_data[0].checked = true;
settings_data[1].checked = true;
settings_data[2].checked = false;
settings_data[3].checked = false;

// Обработчик меню настроек
settingsIcon.addEventListener("click", () => {
    settingsMenu.style.display = (settingsMenu.style.display === "none" || settingsMenu.style.display === "") ? "block" : "none";
});
settingsIcon.click();

settingsMenu.addEventListener("change", () => {
    settings_data[0].checked ? stripeContainer.classList.remove("hidden") : stripeContainer.classList.add("hidden");
    settings_data[0].checked ? timeDisplay.style.top = "120px" : timeDisplay.style.top = "-20px";
    settings_data[1].checked ? arrow.classList.remove("hidden") : arrow.classList.add("hidden");
    showGhost = settings_data[1].checked;
});

