import ImageZoom from "js-image-zoom";
import initTabs, { disableScroll } from ".";
import { isChild } from './utils.js'
import { setMenu } from './menu-shop.js';




if (window.location.pathname.includes('product')) {
    const currentId = new URL(window.location).searchParams.get('id');
    const $mainImage = document.querySelector('.product-card__main-image img');
    const $images = document.querySelector('.product-card__images');
    const $name = document.querySelector('.product-card__name');
    const $brand = document.querySelector('.product-card__row--brand .product-card__value');
    const $ratingValue = document.querySelector('.product-card__rating-value');
    const $rating = document.querySelector('.rating');
    const $right = document.querySelector('.product-card__right');
    const $reviewsMoreBtn = document.querySelector('.product-reviews__more-btn')
    $reviewsMoreBtn.setAttribute('href', `reviews.html?id=${currentId}`)
  


    const res = await fetch('./resources/products.json')
    const data = await res.json()

    const resMenu = await fetch('./resources/menu.json')
    const dataMenu = await resMenu.json();

    const currentProd = data.filter(p => p.id === Number(currentId));
    const currentCat = currentProd[0].category

    $name.textContent = currentProd[0].name
   
    $brand.textContent = currentProd[0].brand
    $ratingValue.textContent = currentProd[0].rating
    $rating.dataset.value = currentProd[0].rating
    $mainImage.setAttribute('src', `/images/shop/${currentProd[0].images[0]}`)

    setMenu(currentCat,dataMenu)


    let item = ''
    currentProd[0].images.forEach(m => {
        item = `
        <div class="product-card__image product-card__image">
                    <img src="/images/shop/${m}" alt="card-product">
                </div>
        `


        $images.insertAdjacentHTML('afterbegin', item)
    })

    currentProd[0].images.forEach(m => {
        item = `
        <div class="product-card__image product-card__image">
                    <img src="/images/shop/${m}" alt="card-product">
                </div>
        `


        $images.insertAdjacentHTML('afterbegin', item)
    })


    const $card = document.querySelector('.product-card');
    $card.addEventListener('click', (e) => {
        if (e.target.closest('.product-card__media')) {
            const el = e.target.closest('.product-card__media')
            const modalId = el.dataset.target
            const currentModal = document.querySelector(`[data-modal="${modalId}"]`)
            if (currentModal) {
                initTabs()
                disableScroll()
                currentModal.classList.add('is-open')
                currentModal.querySelector('.modal__container').classList.add('modal-open')
            }
        }
    })

    const $imagesItems = document.querySelectorAll('.product-card__image');
    if ($imagesItems.length > 0) {


        const options = {
            width: $mainImage.offsetWidth,
            height: $mainImage.offsetHeight,
            scale: 0.5,
            // zoomWidth: 500,
            zoomStyle: `width:${$right.offsetWidth}px; z-index:1;height:${$right.offsetHeight}px;background-color:white`,
            offset: { vertical: 0, horizontal: 60 }
        };


        let zoom = new ImageZoom(document.querySelector(".product-card__main-image"), options);

        $imagesItems.forEach(t => {
            t.addEventListener('mouseenter', (e) => {
                const img = e.target.querySelector('img')

                const src = img.getAttribute('src')
                $mainImage.setAttribute('src', src)
                removeActive($imagesItems)
                e.target.classList.add('product-card__image--active')
                setZoom()
            })

        })


        function removeActive(images) {
            images.forEach(t => {
                t.classList.remove('product-card__image--active')
            })
        }

        function setZoom() {
            const options = {
                width: $mainImage.offsetWidth,
                height: $mainImage.offsetHeight,
                scale: 0.5,
                // zoomWidth: 500,
                zoomStyle: `width:${$right.offsetWidth}px;z-index:1; height:${$right.offsetHeight}px;background-color:white`,
                offset: { vertical: 0, horizontal: 60 }
            };
            zoom.kill()
            zoom = new ImageZoom(document.querySelector(".product-card__main-image"), options);
        }
    }



    const $slider = document.querySelector('.products-sb-slider .swiper-wrapper');

    setSlider()

    async function setSlider() {


        data.filter(d => d.id <= 10)
            .forEach(p => {
                item = `
                    <div class="swiper-slide products-sb__slide">
                        <article class="card-product">
                            <a href="/product.html?id=${p.id}" class="card-product__link">
                                <div class="card-product__images">
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[0]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[1]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[2]}" alt="card-image">
                                    </div>
                                </div>
                                <div class="card-product__price">
                                    <span class="card-product__price-current">
                                         ${p.price}&thinsp;₽
                                    </span>
                                    <span class="card-product__price-prev">
                                        ${p.prevPrice}&thinsp;₽
                                    </span>
                                    <span class="card-product__price-discount">
                                        -50%
                                    </span>
                                </div>
                                <h3 class="card-product__title">
                                     ${p.name}
                                </h3>
                                <p class="card-product__text">
                                    Надежный и&nbsp;легкий трос с&nbsp;гарантированная безопасность для Вас
                                    и&nbsp;Ваших гостей
                                </p>
                            </a>
                        </article>
                    </div>
                    `


                $slider.insertAdjacentHTML('afterbegin', item)
            })

    }


   
}
