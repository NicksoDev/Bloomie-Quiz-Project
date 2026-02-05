const showcaseFlowers = [
    { name: "Sunflower", img: "img/sunflower.png", desc: "ความสดใส" },
    { name: "Rose", img: "img/redrose.png", desc: "ความรัก" },
    { name: "Daisy", img: "img/daisy.png", desc: "ความจริงใจ" },
    { name: "Tulip", img: "img/tulip.png", desc: "ความอบอุ่น" },
    { name: "Hydrangea", img: "img/hydrangea.png", desc: "ความเข้าใจ" }
];

function renderRandomFlowers() {
    const container = document.getElementById('randomFlowerShowcase');

    const shuffled = showcaseFlowers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    let htmlContent = '';
    selected.forEach(flower => {
        htmlContent += `
        <div class="flower-card">
           <img src="${flower.img}" alt="${flower.name}">
           <p style="text-align:center; font-weight:bold; margin-top:5px; color:#555;">${flower.desc}</p>
        </div>
      `;
    });

    container.innerHTML = htmlContent;
}


renderRandomFlowers();