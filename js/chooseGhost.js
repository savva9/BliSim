const ghostSettings = document.querySelector(".setting-choose-ghost");
const customUrlInput = document.querySelector(".custom-url");
const applyButton = document.getElementById("applyButton");

let choosedGhost = ["None", ""];
let selectedGhost = null;

// Обработчик выбора призрака
document.querySelector(".choose-ghost").addEventListener("click", () => {
    overlay.style.display = "block";
    ghostSettings.style.display = "block";
});

// Обработчик кликов на изображения призраков
document.querySelectorAll(".setting-ghost").forEach(ghost => {
    ghost.addEventListener("click", () => {
        if (selectedGhost) {
            selectedGhost.classList.remove("selected");
        }
        ghost.classList.add("selected");
        selectedGhost = ghost;
        if (ghost.alt != "Custom") {
            applyButton.disabled = false;
            customUrlInput.classList.add("fullHidden");
            ghostSettings.style.height = "45%";
        } else {
            applyButton.disabled = true;
            customUrlInput.classList.remove("fullHidden");
            ghostSettings.style.height = "50%";
        }
    });
    if (ghost.alt === "Custom") {
        customUrlInput.addEventListener("input", () => {
            if (customUrlInput.value.length > 0) {
                applyButton.disabled = true;
                const img = new Image();
                img.onload = () => {
                    applyButton.disabled = false;
                };
                img.onerror = () => {
                    applyButton.disabled = true;
                };
                img.src = customUrlInput.value;
            } else {
                applyButton.disabled = true;
            }
        });
    }
});

// Обработчик кнопки "Применить" для выбора призрака
applyButton.addEventListener("click", () => {
    if (selectedGhost) {
        overlay.style.display = "none";
        ghostSettings.style.display = "none";

        choosedGhost = [selectedGhost.alt, selectedGhost.src];
        if (choosedGhost[0] === "Custom") {
            choosedGhost[1] = customUrlInput.value;
            ghostGender = null;
        } else if (["Butcher", "Fisherman", "Greybeard", "Sofia", "Nerd", "Skeleton", "Brute"].includes(choosedGhost[0])) {
            ghostGender = ["Butcher", "Fisherman", "Greybeard", "Sofia", "Nerd", "Skeleton", "Brute"];
        } else if (["Creepy Girl", "Old Crone", "Patient 07", "Argyro"].includes(choosedGhost[0])) {
            ghostGender = ["Creepy Girl", "Old Crone", "Patient 07", "Argyro"];
        } else {
            ghostGender = null;
        }

        if (choosedGhost[0] != "Custom") {
            customUrlInput.value = "";
        }

        choosedGhostImg.src = choosedGhost[1];
        canClick = true;
    }
});

document.querySelector(".setting-ghost[alt=None]").click();