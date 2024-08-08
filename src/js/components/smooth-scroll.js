import SmoothScroll from 'smooth-scroll';


const toTop = document.querySelector('.to-top');
const toReviews = document.querySelector('.product-card__reviews');
if (toTop)
  new SmoothScroll('.to-top');

if (toReviews)

  new SmoothScroll('.product-card__reviews');

let heroHeight;

if (document.querySelector('.hero')) {
  heroHeight = document.querySelector('.hero').offsetHeight;
  const isVisibleToTop = (y = 0) => {
    if (y >= heroHeight) {
      toTop.classList.add('to-top--active');
    } else {
      toTop.classList.remove('to-top--active');
    }
  }

  isVisibleToTop(window.scrollY);

  window.addEventListener('scroll', () => {
    let y = window.scrollY;
   
    isVisibleToTop(y);
  });
}

