import { disableScroll } from ".";


if (window.location.pathname.includes('tour')) {
    const currentId = new URL(window.location).searchParams.get('id');
    const $title = document.querySelector('.tour-section__title');
    const $breadcrumbName = document.querySelector('.tour-name');
    const $blockImages = document.querySelectorAll('.block__image img');
    const $showMedia = document.querySelectorAll('.block__right img');


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

}
