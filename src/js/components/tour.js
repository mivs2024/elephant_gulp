import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { disableScroll,enableScroll } from './aside';



if (window.location.pathname.includes('tour')) {
    const currentId = new URL(window.location).searchParams.get('id');
    const $title = document.querySelector('.tour-section__title');
    const $breadcrumbName = document.querySelector('.tour-name');
    const $blockImages = document.querySelectorAll('.block__image img');
    const $showMedia = document.querySelectorAll('.block__right img');
    const $showMediaPhotoSwipe = document.querySelectorAll('.block__right-photoswipe img');


    const res = await fetch('./resources/tours.json')
    const data = await res.json()
    const currentTour = data.filter(p => p.id === Number(currentId));

    $title.textContent = currentTour[0].name
    $breadcrumbName.textContent = currentTour[0].name

    $blockImages.forEach((b, index) => {
        b.setAttribute('src', `/images/tours/${currentTour[0].images[index]}`)
    })



    $showMedia.forEach(b => {

        b.addEventListener('click', (e) => {
            const modalId = e.currentTarget.dataset.target
            const currentModal = document.querySelector(`[data-modal="${modalId}"]`)


            if (currentModal) {
                disableScroll()
                currentModal.classList.add('is-open')
            }
        })
    })




    const lightbox = new PhotoSwipeLightbox({
        showHideAnimationType: 'none',
        pswpModule: () => import('photoswipe'),
    });

    
    lightbox.addFilter('numItems', (numItems) => {
        return currentTour[0].images.length;
      });


    lightbox.addFilter('itemData', (itemData, index) => {
        return {
            src: `/images/tours/${currentTour[0].images[index]}`,
             width: 500,
             height: 500
        };;
    });
    lightbox.init();



    $showMediaPhotoSwipe.forEach(b => {

        b.addEventListener('click', (e) => {
            lightbox.loadAndOpen(0);
        })
    })


}
