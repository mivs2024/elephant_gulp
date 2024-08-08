import ImageZoom from "js-image-zoom";
import initTabs, { disableScroll } from ".";

const $images = document.querySelectorAll('.product-card__image');
const $mediaShow = document.querySelector('.product-card__media');
const $mainImage = document.querySelector('.product-card__main-image img');
const $mainImageWrapper = document.querySelector('.product-card__main-image');
const $right = document.querySelector('.product-card__right');
// console.log($mainImage.offsetWidth );

if ($mediaShow) {
    $mediaShow.addEventListener('click', (e) => {

        const modalId = e.currentTarget.dataset.target
        const currentModal = document.querySelector(`[data-modal="${modalId}"]`)


        if (currentModal) {
            initTabs()
            disableScroll()
            currentModal.classList.add('is-open')
            currentModal.querySelector('.modal__container').classList.add('modal-open')
        }
    })
}
if ($images.length>0) {
  

    const options = {
        width: $mainImage.offsetWidth,
        height: $mainImage.offsetHeight,
        scale: 0.5,
        // zoomWidth: 500,
        zoomStyle: `width:${$right.offsetWidth}px; z-index:1;height:${$right.offsetHeight}px;background-color:white`,
        offset: { vertical: 0, horizontal: 60 }
    };


    let zoom = new ImageZoom(document.querySelector(".product-card__main-image"), options);

    if ($images) {
        $images.forEach(t => {
            t.addEventListener('mouseenter', (e) => {
                const img = e.target.querySelector('img')

                const src = img.getAttribute('src')
                $mainImage.setAttribute('src', src)
                removeActive($images)
                e.target.classList.add('product-card__image--active')
                setZoom()
            })

        })
    }


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