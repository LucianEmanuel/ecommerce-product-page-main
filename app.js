'use strict';

const quantity = document.querySelector('.quantity-value');
const quantityBtns = document.querySelectorAll('.btn');
const infoCart = document.querySelector('.info-cart__content');
const delBtn = document.querySelector('.img-icon');
const submitBtn = document.querySelector('.cart-btn');
const basket = document.querySelector('.basket-filled');

let quantityValue = 0;

window.addEventListener('load', modifyCartContent);
quantityBtns.forEach(btn => {
  btn.addEventListener('click', modifyQuantity);
});
submitBtn.addEventListener('click', addToCart);

function modifyQuantity(element) {
  if (element.currentTarget.classList.contains('btn-increment')) {
    quantityValue++;
    quantity.textContent = quantityValue;
  } else if (
    element.currentTarget.classList.contains('btn-decrement') &&
    quantityValue > 0
  ) {
    quantityValue--;
    quantity.textContent = quantityValue;
  }
}
function modifyCartContent() {
  if (quantityValue === 0) {
    infoCart.style.gridTemplateRows = '1fr';
    infoCart.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
  } else {
    infoCart.innerHTML = addToCart();
  }
}

function addToCart() {
  if (quantityValue > 0) {
    infoCart.innerHTML = `
    <div class="cart-first-row">
      <img src="images/image-product-1.jpg"
      alt="Sneakers photo"
      class="hero-img active"/>
     <div class="cart-product-info">
      <p>Fall Limited Edition Sneakers</p><p>$125.00 x ${quantityValue}<span class="final-price">$${
      125 * quantityValue
    }</span><p>
    </div class="img-icon">
      <img src="images/icon-delete.svg" class="delete-icon">
    </div>
    <div class="cart-second-row">
      <button class="cart-btn">Checkout</button>
    </div>`;
  }
  if (quantityValue > 0) {
    basket.style.visibility = 'visible';
    basket.textContent = quantityValue;
  }

  infoCart.addEventListener('click', delCart);
}

function delCart(e) {
  if (e.target.classList.contains('delete-icon')) {
    infoCart.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    quantityValue = 0;
    quantity.textContent = quantityValue;
    basket.style.visibility = 'hidden';
    basket.textContent = '';
  }
}

/* Images */
const bigImg = [...document.querySelectorAll('.images .hero-img')];
const smallImg = [...document.querySelectorAll('.images .small-img')];
const smallImgModal = [...document.querySelectorAll('.modal-img .small-img')];

const modal = document.querySelector('.modal-full-width');
const modalImg = document.querySelector('.modal-img');
const modalImgDisplay = document.querySelector('.modal-img .hero-img');

bigImg.forEach(img => {
  img.addEventListener('click', showModalImg);
});
let idx = 0;
function showNextPictureModal(e) {
  if (e.currentTarget.classList.contains('next')) {
    if (idx < bigImg.length - 1) {
      smallImgModal[idx].classList.remove('active-thumb');
      idx++;
      modalImgDisplay.src = bigImg[idx].src;
      smallImgModal[idx].classList.add('active-thumb');
    } else {
      smallImgModal[idx].classList.remove('active-thumb');
      idx = 0;
      modalImgDisplay.src = bigImg[idx].src;
      smallImgModal[idx].classList.add('active-thumb');
    }
  }

  if (e.currentTarget.classList.contains('prev')) {
    if (idx === 0) {
      smallImgModal[idx].classList.remove('active-thumb');
      idx = bigImg.length - 1;
      modalImgDisplay.src = bigImg[idx].src;
      smallImgModal[idx].classList.add('active-thumb');
    } else if (idx > 0) {
      smallImgModal[idx].classList.remove('active-thumb');
      idx--;
      modalImgDisplay.src = bigImg[idx].src;
      smallImgModal[idx].classList.add('active-thumb');
    }
  }
}

function showModalImg() {
  let width = window.innerWidth;
  if (width > 800) {
    modal.classList.remove('hidden');
    modalImg.classList.remove('hidden');
    const closeModal = document.querySelector('.close-modal');
    const modalBtns = document.querySelectorAll('.modal-btn');
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      modalImg.classList.add('hidden');
    });
    modalBtns.forEach(btn => {
      btn.addEventListener('click', showNextPictureModal);
    });
  }
}

smallImg.forEach(img => {
  img.addEventListener('click', displayCurrentImg);
});

function displayCurrentImg(e) {
  const element = e.currentTarget;
  let index = smallImg.indexOf(element);
  for (const image of smallImg) {
    image.classList.remove('active-thumb');
    element.classList.add('active-thumb');
  }
  for (const el of bigImg) {
    el.classList.remove('active');
    bigImg[index].classList.add('active');
  }
}

/* mobile */

const menu = document.querySelector('.hamburger-menu');
const closeMenu = document.querySelector('.close-menu');
const navMenu = document.querySelector('.nav-menu');
const mobileBtn = document.querySelectorAll('.mobile-btn');

menu.addEventListener('click', mobileMenu);
mobileBtn.forEach(btn => {
  btn.addEventListener('click', showNextPicture);
});

function mobileMenu(e) {
  if (e.target.classList.contains('open-menu')) {
    navMenu.style.display = 'block';
    closeMenu.style.display = 'block';
  } else if (e.target.classList.contains('close-menu')) {
    navMenu.style.display = 'none';
    closeMenu.style.display = 'none';
  }
}

function showNextPicture(e) {
  if (e.currentTarget.classList.contains('next')) {
    if (idx < bigImg.length - 1) {
      bigImg[idx].classList.remove('active');
      idx++;
      bigImg[idx].classList.add('active');
    } else {
      bigImg[idx].classList.remove('active');
      idx = 0;
      bigImg[idx].classList.add('active');
    }
  }

  if (e.currentTarget.classList.contains('prev')) {
    if (idx === 0) {
      bigImg[idx].classList.remove('active');
      idx = bigImg.length - 1;
      bigImg[idx].classList.add('active');
    } else if (idx > 0) {
      bigImg[idx].classList.remove('active');
      idx--;
      bigImg[idx].classList.add('active');
    }
  }
}
