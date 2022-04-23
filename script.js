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

// интерактивная корзина
let cartButton = document.querySelector('.cart-items');
let cartPanel = document.querySelector('.cart-panel');
cartButton.addEventListener('mouseover', () => {
    cartPanel.classList.remove('hidden');
})
cartButton.addEventListener('mouseout', () => {
    cartPanel.classList.add('hidden');
})

let cart = {};

document.querySelectorAll('.fetured-block').forEach((productCard)=>{
    productCard.addEventListener('click', e => {
        if (e.target.classList.contains('hover-fog-btn') || e.target.parentNode.classList.contains('hover-fog-btn') ) {
            let productName = e.currentTarget.querySelector('.fetured-txt-title').innerText;
            let productprice = e.currentTarget.querySelector('.fetured-txt-prise').innerText.replace('$','');
            incrCartCount();
            addToCart(productName, productprice);
            renderCartPanel();
        }
    })
})

function incrCartCount() {
    document.querySelector('.cart-items>span').innerText++;
}

function addToCart(product, price) {
   if (product in cart) {
    cart[product].count++;
   }
   else {
       cart[product] = {};
       cart[product].price = price;
       cart[product].count = 1;
   }
}

function renderCartPanel() {
    let productsEl = document.querySelector('.cartPanel-items');
    productsEl.innerHTML = '';
    let totalSumm = 0;
    for (prod in cart){
        productsEl.insertAdjacentHTML('beforeEnd', getProductMarkup(prod))
        totalSumm += cart[prod].price * cart[prod].count;
    }
    document.querySelector('.cart-total').innerText = totalSumm.toFixed(2);
}

function getProductMarkup(product) {
    return `
    <div class="cartPanel-item">
        <div class="prod-name">${product}</div>
        <div>${cart[product].count}</div>
        <div>${cart[product].price}</div>
        <div>${(cart[product].count * cart[product].price).toFixed(2)}</div>
    </div>
`}