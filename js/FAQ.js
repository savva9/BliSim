const FAQButton = document.querySelector(".FAQ-button")
const FAQ = document.querySelector(".FAQ");
let isFAQOpen = false;

// Показать FAQ
FAQButton.addEventListener("click", () => {
    isFAQOpen = true;
    FAQ.style.display = "block";
    overlay.style.display = "block";
});

// Закрытие FAQ при клике вне области меню
document.addEventListener("click", (event) => {
    const isClickInsideFAQ = FAQ.contains(event.target);
    const isClickOnFAQButton = FAQButton.contains(event.target);

    if (!isClickInsideFAQ && !isClickOnFAQButton && isFAQOpen) {
        isFAQOpen = false;
        FAQ.style.display = "none";
        overlay.style.display = "none";
    }
});