const ghostSettingsAudio = document.querySelector(".setting-choose-photo-audio");
const applyButtonAudio = document.querySelectorAll(".setting-photo");
let photoAudio = null;
let choosedPhotoAudio = null;
const photoAudioVolume = {
    "T1": [0.35, 3],
    "T2": [0.9,  2],
    "T3": [0.3,  1],
}

// Обработчик выбора призрака
document.querySelector(".choose-photo-audio").addEventListener("click", () => {
    overlay.style.display = "block";
    ghostSettingsAudio.style.display = "block";
});

// Слушать кнопку мерцаний призрака
applyButtonAudio.forEach(photoAudioObj => {
    photoAudioObj.addEventListener("click", () => {
        overlay.style.display = "none";
        ghostSettingsAudio.style.display = "none";

        choosedPhotoAudio = photoAudioObj.alt;

        if (choosedPhotoAudio === "None") {
            photoAudio = null;
        } else {
            photoAudio = new Audio(`audio/${choosedPhotoAudio}.wav`);
            photoAudio.volume = photoAudioVolume[choosedPhotoAudio][0];
        }

        const lastSelected = document.querySelector(".setting-photo.selected");
        if (lastSelected) {
            lastSelected.classList.remove("selected");
        }
        photoAudioObj.classList.add("selected");
        
        isSleep = false;
    });
});
