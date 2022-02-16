let panelMenu = document.querySelector('.menu-panel');
let menuButton = document.querySelector('.menu');
let menuClose = document.querySelector('.close-img');

function toggleMenuPanel() {
    panelMenu.classList.toggle('hidden');
}

menuButton.addEventListener('click', toggleMenuPanel);
menuClose.addEventListener('click', toggleMenuPanel);
