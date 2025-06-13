// Добавление сегментов на полосу

function createLine() {
    blinkinsData.forEach(([lengthRatio, colorFlag, description]) => {
        const segment = document.createElement("div");
        segment.classList.add("segment");

        // Рассчитываем ширину сегмента
        const segmentWidth = lengthRatio * 1000;
        segment.style.width = `${segmentWidth * 100}px`;
        segment.style.backgroundColor = colorFlag === 1 ? "black" : "white";

        // Создаем и добавляем подсказку
        const fullDescription = [
            `${(lengthRatio * 1000).toFixed(0)}мс`,
            colorFlag ? "Видно" : "Не видно",
            description
        ];

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.style.bottom = description ? "-90px" : "-70px";
        tooltip.innerHTML = fullDescription.join("<br>");

        segment.appendChild(tooltip);

        // Показываем подсказку при наведении
        segment.addEventListener("mouseenter", () => tooltip.style.display = "block");
        segment.addEventListener("mouseleave", () => tooltip.style.display = "none");

        stripeContainer.appendChild(segment);
    });
}

createLine();
