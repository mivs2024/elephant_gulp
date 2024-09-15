import { disableScroll } from ".";

import { setMenu } from './menu-shop.js';
import { pagination } from "./pagination.js";
import { setRivewsGraph } from "./utils.js";


const perPage = 10


if (window.location.pathname.includes('reviews')) {
    const currentId = new URL(window.location).searchParams.get('id');
    const res = await fetch('./resources/products.json')
    const data = await res.json()

    const resMenu = await fetch('./resources/menu.json')
    const dataMenu = await resMenu.json();

    const currentProd = data.filter(p => p.id === Number(currentId));
    const currentCat = currentProd[0].category



    const $reviewsMedia = document.querySelector('.btn-photo');

    const $reviews = document.querySelector('.reviews-section__reviews');
    const $pagination = document.querySelector('.reviews-section__pagination');
    const $howMany = document.querySelector('.reviews-section__count');
    const $title = document.querySelector('.reviews-section__title');
    const $rating = document.querySelector('.reviews-section__value');
    const currentPage = new URL(window.location).searchParams.get('page') || 1;

    const $reviewsGraph = document.querySelector('.reviews-section__graph');

    $title.textContent = currentProd[0].name
    $rating.textContent = `${currentProd[0].rating}/5`

    setMenu(currentCat, dataMenu)

    setReviews(currentPage, perPage)

    async function setReviews(currentPage, perPage) {


        const resReviews = await fetch('./resources/reviews.json')
        const dataReviews = await resReviews.json();

        const reviewsValues = []
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

        setRivewsGraph($reviewsGraph, reviewsValues, dataReviews.length)


        let item = ''
        dataReviews.filter((d, index) => index >= (currentPage - 1) * perPage && index < currentPage * perPage)
            .forEach(p => {
                item = `
                   <div class="reviews-section__review review">
                    <div class="review__left">
                        <div class="review__rating rating" data-value="${p.rating}">
                            <div class="rating__stars">
                                <span class="rating__star-stroke"></span>
                                <span class="rating__star-stroke"></span>
                                <span class="rating__star-stroke"></span>
                                <span class="rating__star-stroke"></span>
                                <span class="rating__star-stroke"></span>
                            </div>
                            <div class="rating__fill">
                                <span class="rating__star-fill"></span>
                                <span class="rating__star-fill"></span>
                                <span class="rating__star-fill"></span>
                                <span class="rating__star-fill"></span>
                                <span class="rating__star-fill"></span>
                            </div>
                        </div>
                        <div class="review__data text">${p.date}</div>
                    </div>
                    <div class="review__right">
                        <div class="review__header">
                            <div class="review__avatar">Л</div>
                            <div class="review__user">
                                <div class="review__name">${p.name}</div>
                                <p class="review__location">${p.location}</p>
    
                            </div>
                        </div>
                        <p class="review__text">
                        ${p.text}
                        </p>
                    </div>
                </div>  
                    `


                $reviews.insertAdjacentHTML('afterbegin', item)
            })

        pagination(perPage, dataReviews.length)

        $howMany.textContent = `${Number(currentPage - 1) * perPage + 1} - ${Math.min(Number(currentPage) * perPage, data.length)}`


    }


    if ($reviewsMedia) {
        $reviewsMedia.addEventListener('click', (e) => {


            const modalId = e.currentTarget.dataset.target
            const currentModal = document.querySelector(`[data-modal="${modalId}"]`)


            if (currentModal) {
                disableScroll()
                currentModal.classList.add('is-open')
            }
        })
    }

}






