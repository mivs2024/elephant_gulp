import { createPopper } from '@popperjs/core';
import ImageZoom from "js-image-zoom";
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import initTabs, { disableScroll } from ".";
import { setMenu } from './menu-shop.js';
import { isChild, setRivewsGraph } from "./utils.js";




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
    $reviewsMoreBtn.setAttribute('href', `/elephant/reviews.html?id=${currentId}`)



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
    $mainImage.setAttribute('src', `/elephant/images/shop/${currentProd[0].images[0]}`)

    setMenu(currentCat, dataMenu)


    let item = ''
    currentProd[0].images.forEach(m => {
        item = `
        <div class="product-card__image product-card__image">
                    <img src="/elephant/images/shop/${m}" alt="card-product">
                </div>
        `


        $images.insertAdjacentHTML('afterbegin', item)
    })

    currentProd[0].images.forEach(m => {
        item = `
        <div class="product-card__image product-card__image">
                    <img src="/elephant/images/shop/${m}" alt="card-product">
                </div>
        `


        $images.insertAdjacentHTML('afterbegin', item)
    })

    setSliderCard(currentProd[0].images)


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




    setSlider(currentCat, data)

 function setSlider(cat, dataProducts) {

        const $productsSbSlider = document.querySelector('.products-sb-slider.swiper')
        const $sliderWrapper = document.querySelector('.products-sb-slider .swiper-wrapper')

        dataProducts.filter(d => isChild(cat, d.category))
            .forEach(p => {
                item = `
                    <div class="swiper-slide products-sb__slide">
                        <article class="card-product">
                            <a href="/elephant/product.html?id=${p.id}" class="card-product__link">
                                <div class="card-product__images">
                                    <div class="card-product__image">
                                        <img src="/elephant/images/shop/${p.images[0]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/elephant/images/shop/${p.images[1]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/elephant/images/elephant/${p.images[2]}" alt="card-image">
                                    </div>
                                </div>
                                <div class="card-product__price">
                                    <span class="card-product__price-current text-600">
                                         ${p.price}&thinsp;₽
                                    </span>
                                    <span class="card-product__price-prev text-600">
                                        ${p.prevPrice}&thinsp;₽
                                    </span>
                                    <span class="card-product__price-discount text-600">
                                        -50%
                                    </span>
                                </div>
                                <h3 class="card-product__title text-600">
                                     ${p.name}
                                </h3>
                                <p class="card-product__text text">
                                    Надежный и&nbsp;легкий трос с&nbsp;гарантированная безопасность для Вас
                                    и&nbsp;Ваших гостей
                                </p>
                            </a>
                        </article>
                    </div>
                    `


                $sliderWrapper.insertAdjacentHTML('afterbegin', item)
            })



        if ($productsSbSlider) {

            new Swiper($productsSbSlider, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,

                // configure Swiper to use modules
                modules: [Navigation, Pagination],
                pagination: {
                    el: '.slider-pagination.products-sb__pagination',
                    bulletClass: 'slider-pagination__bullet',
                    bulletActiveClass: 'slider-pagination__bullet--active',

                },

                // Navigation arrows
                navigation: {
                    nextEl: '.products-sb__next',
                    prevEl: '.products-sb__prev',
                },

                breakpoints:{
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }
            });
        }


    }

    function setSliderCard(dataImages) {

        const $productSlider = document.querySelector('.product-card-slider.swiper')
        const $sliderWrapper = document.querySelector('.product-card-slider .swiper-wrapper')

        dataImages
            .forEach(p => {
                item = `
                    <div class="swiper-slide product-card__slide">
                         <div class="product-card__card">
                    <img src="/elephant/images/shop/${p}" alt="image">
                </div>
                    </div>
                    `


                $sliderWrapper.insertAdjacentHTML('afterbegin', item)
            })



        if ($productSlider) {

            new Swiper($productSlider, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,

                // configure Swiper to use modules
                modules: [Pagination],
                pagination: {
                    el: '.slider-pagination.product-card__pagination',
                    bulletClass: 'slider-pagination__bullet',
                    bulletActiveClass: 'slider-pagination__bullet--active',

                },
              
            });
        }


    }


    const $trigger = document.querySelector('.product-card__right .rating');
    const $popper = document.querySelector('.popper-rating');

    const resReviews = await fetch('./resources/reviews.json')
    const dataReviews = await resReviews.json();

    const reviewsValues=[]
    reviewsValues.push(0)
    reviewsValues.push(0)
    reviewsValues.push(0)
    reviewsValues.push(0)
    reviewsValues.push(0)

    dataReviews.forEach(d => {
        if (Math.round(d.rating) === 1) {
            reviewsValues[0] += 1
        }

        if (Math.round(d.rating) === 2) {
            reviewsValues[1] += 1
        }

        if (Math.round(d.rating) === 3) {
            reviewsValues[2] += 1
        }

        if (Math.round(d.rating) === 4) {
            reviewsValues[3] += 1
        }

        if (Math.round(d.rating) === 5) {
            reviewsValues[4] += 1
        }

    })

   

    const $reviewsGraph = document.querySelector('.rating-graph');


    const popperInstance = createPopper($trigger, $popper, {
        placement: 'bottom-start',
    });

    function show() {
        $popper.setAttribute('data-show', '');

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update();
        setRivewsGraph($reviewsGraph,reviewsValues,dataReviews.length)
    }

    function hide() {
        $popper.removeAttribute('data-show');
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach((event) => {
        $trigger.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
        $trigger.addEventListener(event, hide);
    });


}
