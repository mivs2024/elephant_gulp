import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
// import Swiper and modules styles
// import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';





const  reviewsSlider = document.querySelector('.reviews-media__slider')

if(reviewsSlider){
   const swiper =  new Swiper(reviewsSlider, {
        spaceBetween: 10,
        // configure Swiper to use modules
        modules: [Navigation],
        // Navigation arrows
        navigation: {
            nextEl: '.reviews-media__next',
            prevEl: '.reviews-media__prev',
        },
      
    });
}




const  eventsNextSlider = document.querySelector('.events-next-slider')

if(eventsNextSlider){

    const events = new Swiper(eventsNextSlider, {
    
        slidesPerView: 1,
        loop: true,

        // configure Swiper to use modules
        modules: [Navigation],
    
    
    
        // Navigation arrows
        navigation: {
            nextEl: '.events-next__next',
            prevEl: '.events-next__prev',
        },
        breakpoints:{
            1024: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    
    if (events) {
        const totalSlides = document.querySelector('.events-next__slides-total');
        totalSlides.textContent = events.slides.length;
        const activeSlide = document.querySelector('.events-next__slide-active');
        events.on('slideChange', function (s) {
    
            activeSlide.textContent = s.realIndex + 1;
    
    
        });
    }
}

const  workersSlider = document.querySelector('.workers-slider')

if(workersSlider){

    const workers = new Swiper(workersSlider, {
        //  spaceBetween: 150,
        slidesPerView: "auto",
        speed:500,
        loop: true,
        centeredSlides: true,
        // configure Swiper to use modules
        modules: [Navigation],
      
    
        // Navigation arrows
        navigation: {
            nextEl: '.workers__next',
            prevEl: '.workers__prev',
        },
    });
}

const  eventsPrevSlider = document.querySelector('.events-prev-slider')

if(eventsPrevSlider){

    const prevSlider = new Swiper(eventsPrevSlider, {
        slidesPerView: 1,
     
        
        // configure Swiper to use modules
        modules: [Navigation],
    
        // Navigation arrows
        navigation: {
            nextEl: '.events-prev__next',
            prevEl: '.events-prev__prev',
        },
    });

    

    prevSlider.on('slideChange', function (s) {
  
        timeItems.forEach(el => {
          el.classList.remove('time--active');
        });
    
        document.querySelector(`.time[data-index="${s.realIndex}"]`).classList.add('time--active');
      });
    
      const timeItems = document.querySelectorAll('.time');
    
      timeItems.forEach((el, idx) => {
        el.setAttribute('data-index', idx);
    
        el.addEventListener('click', (e) => {
          const index = e.currentTarget.dataset.index;
        
    
          timeItems.forEach(el => {
            el.classList.remove('time--active');
          });
    
          e.currentTarget.classList.add('time--active');
    
          prevSlider.slideTo(index);
        });
      });

      document.querySelector(`.time[data-index="${prevSlider.realIndex}"]`).classList.add('time--active');

}
