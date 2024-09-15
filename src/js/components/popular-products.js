import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

if (window.location.pathname.includes('index')) {
    const $slider = document.querySelector('.popular-products-slider .swiper-wrapper');

    setSlider()

    async function setSlider() {

        const res = await fetch('./resources/products.json')
        const data = await res.json();

        let item=''


        data.filter(d => d.id <= 10)
            .forEach(p => {
                item = `
                    <div class="swiper-slide popular-products__slide">
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
                                        <img src="/elephant/images/shop/${p.images[2]}" alt="card-image">
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

        const popularSlider = document.querySelector('.popular-products-slider')

        if (popularSlider) {

            new Swiper(popularSlider, {
                spaceBetween: 20,
                slidesPerView: 1,
                loop: true,

                // configure Swiper to use modules
                modules: [Navigation, Pagination],
                pagination: {
                    el: '.slider-pagination.popular-products__pagination',
                    bulletClass: 'slider-pagination__bullet',
                    bulletActiveClass: 'slider-pagination__bullet--active',
                    clickable: true,
                    //     renderBullet: function (index, className) {
                    //         return `
                    //   <div class="services__bullet ${className}">

                    //   </div>`
                    //     }
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.popular-products__next',
                    prevEl: '.popular-products__prev',
                },
                breakpoints:{
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }
            });
        }

    }

}