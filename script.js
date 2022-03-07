let panelMenu = document.querySelector('.menu-panel');
let menuButton = document.querySelector('.menu');
let menuClose = document.querySelector('.close-img');

let sizeFilterBody = document.querySelector('.fltrsize-body');
let sizeFilter = document.querySelector('.fltrsize-name');
let sizeFilterDown = document.querySelector('.fltrsize img');

let anime = document.querySelector('.test-anime');
let filter = document.querySelector('.filter-logo');
let filteActive = document.querySelector('.filterActive-fat');

menuButton.addEventListener('click', function(){ panelMenu.classList.toggle('hidden') });
menuClose.addEventListener('click', function(){ panelMenu.classList.toggle('hidden') });

if (sizeFilter || filter) {
sizeFilter.addEventListener('click', function(){ sizeFilterBody.classList.toggle('hidden') });
sizeFilterDown.addEventListener('click', function(){ sizeFilterBody.classList.toggle('hidden') });
filter.addEventListener('click', function(){ anime.classList.toggle('onAnime') });
filteActive.addEventListener('click', function(){ anime.classList.toggle('onAnime') });
}

let filterCategories = document.querySelectorAll('.category-head');
filterCategories.forEach(function (category) {
    category.addEventListener('click', function(cat) {
        filterCategories.forEach(function (cats) {
            cats.classList.remove('active')
        });
        cat.target.classList.add('active');
    })
});
