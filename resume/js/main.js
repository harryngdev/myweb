// target icon
const targetHam = document.querySelector(".ham-icon");

// target menu
const targetMenu = document.querySelector(".active");

// event
targetHam.onclick = (e) => {
    e.preventDefault();
    targetMenu.classList.toggle("active");
};