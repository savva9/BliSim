const ghostSettingsAudio = document.querySelector(".setting-choose-photo-audio");
const applyButtonAudio = document.querySelectorAll(".setting-photo");
const photoAudioSettings = document.querySelectorAll(".set-audio-setting");

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
        choosedPhotoAudio = photoAudioObj.alt;
        let setDisabled = null;

        if (choosedPhotoAudio === "None") {
            photoAudio = null;
            setDisabled = true;
        } else {
            photoAudio = new Audio(`audio/${choosedPhotoAudio}.wav`);
            photoAudio.volume = photoAudioVolume[choosedPhotoAudio][0];
            setDisabled = false;
        }

        photoAudioSettings.forEach(el => {
            el.disabled = setDisabled;
        })

        const lastSelected = document.querySelector(".setting-photo.selected");
        if (lastSelected) {
            lastSelected.classList.remove("selected");
        }
        photoAudioObj.classList.add("selected");
        
        isSleep = false;
    });
});

document.querySelector(".applyButtonAudio").addEventListener("click", () => {
    overlay.style.display = "none";
    ghostSettingsAudio.style.display = "none";
})