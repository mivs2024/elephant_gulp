import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination,EffectFade } from 'swiper/modules';

const $sliderSwiper = document.querySelector('.slider-main-services__swiper');
const $sliderSwiperWrapper = document.querySelector('.slider-main-services__swiper-wrapper');
if ($sliderSwiper) {

    setSlider()

    const setItems = (str)=>{
        let item = ''
        str.split('\n').forEach(s=>{
            item+=`<p class = "text-big">${s} </p>`
        })

        return item
    }

    async function setSlider() {

        const res = await fetch('./resources/services.json')
        const data = await res.json();

        let item = ''


        data
            .forEach(p => {
                item = `
                     <div class="swiper-slide main-services__slide">

                        <article class="card-services">
                            <a href="/services.html" class="card-services__link">
                                <img src="/images/card-services/${p.image}" alt="card-image">
                                <div class="card-services__content">
                                    <div class="card-services__right">

                                        <h4 class="card-services__title text-big">
                                        ${p.name}
                                        </h4>
                                    </div>
                                   
                                </div>

                                <div class="card-services__hover">
                                  <div class="card-services__inner">
                                        <h4 class="card-services__inner-title subtitle">
                                            ${p.name}
                                        </h4>
                                        <div class="card-services__inner-text text">
                                         ${setItems(p.text)}
                                        </div>
                                  </div>
                                </div>
                            </a>
                        </article>
                    </div>
                    `


                $sliderSwiperWrapper.insertAdjacentHTML('afterbegin', item)
            })

        new Swiper($sliderSwiper, {
            spaceBetween: 20,
            slidesPerView: "auto",
            loop: "true",
            // configure Swiper to use modules
            modules: [Navigation, Pagination],
            pagination: {
                el: '.slider-pagination.main-services__pagination',
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
                nextEl: '.main-services__next',
                prevEl: '.main-services__prev',
            },
        });

    }
}

const $mainTours = document.querySelector('.main-tours__inner');
if ($mainTours) {

    setTours()

    async function setTours() {

        const res = await fetch('./resources/tours.json')
        const data = await res.json();

        let item=''
        data.filter(d => d.id <= 5)
            .forEach(p => {
                item = `
                    <div class="card-t">

                <a href="/tour.html?id=${p.id}" class="card-t__link">
                    <img class="card-t__img" src="/images/tours/${p.images[0]}" alt="image-tour">
                    <div class="card-t__content">
                        <img class="card-t__icon" width="30" height="30" src="/images/leaf.svg" alt="image-tour">
                        <span class="card-t__text text">View more</span>

                    </div>
                </a>

                <div class="card-t__name text-sm">
                    <span>Путешествие - 3 дня</span>
                </div>
                <a href="/ tour.html?id=${p.id}" class="card-t__descr-link text">
                ${p.name}

                </a>
            </div>
                    `


                $mainTours.insertAdjacentHTML('afterbegin', item)
            })

    }

}

const  mainEventsSlider = document.querySelector('.main-events-slider')

if(mainEventsSlider){

    const events = new Swiper(mainEventsSlider, {
    
        effect: 'fade',
        slidesPerView: 1,
        loop: true,
        // configure Swiper to use modules
        modules: [Navigation, EffectFade],
    
    
    
        // Navigation arrows
        navigation: {
            nextEl: '.main-events__next',
            prevEl: '.main-events__prev',
        },
    });
    
    if (events) {
        const totalSlides = document.querySelector('.main-events__slides-total');
        totalSlides.textContent = events.slides.length;
        const activeSlide = document.querySelector('.main-events__slide-active');
        // events.on('slideChange', function (s) {
    
        //     activeSlide.textContent = s.realIndex + 1;
    
    
        // });
    }
}
