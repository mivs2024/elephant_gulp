import{ disableScroll } from ".";
import {  isChild } from './utils.js'
import { setMenu } from './menu-shop.js';


const perPage = 10
let count_5 = 0
let count_4 = 0
let count_3 = 0
let count_2 = 0
let count_1 = 0

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

    const $scoringItems = document.querySelectorAll('.scoring__row');

    $title.textContent = currentProd[0].name
    $rating.textContent = `${currentProd[0].rating}/5`

    setMenu(currentCat,dataMenu)

    setReviews(currentPage,perPage)

    async function setReviews(currentPage, perPage) {

        const res = await fetch('./resources/reviews.json')
        const data = await res.json();

        data.forEach(d=>{
            if(Math.round(d.rating)===1){
                count_1+=1
            }

            if(Math.round(d.rating)===2){
                count_2+=1
            }

            if(Math.round(d.rating)===3){
                count_3+=1
            }

            if(Math.round(d.rating)===4){
                count_4+=1
            }

            if(Math.round(d.rating)===5){
                count_5+=1
            }

        })

     
        $scoringItems.forEach(s=>{

            s.querySelector('.scoring__count').textContent = data.length
            const currentFill= s.querySelector('.scoring__fill')

            if(Number(s.dataset.value)===1){
                currentFill.style.width = Math.floor((100 * count_1) / data.length)+'%'
            }
            if(Number(s.dataset.value)===2){
                currentFill.style.width = Math.floor((100 * count_2) / data.length)+'%'
            }
            if(Number(s.dataset.value)===3){
                currentFill.style.width = Math.floor((100 * count_3) / data.length)+'%'
            }
            if(Number(s.dataset.value)===4){
                currentFill.style.width = Math.floor((100 * count_4) / data.length)+'%'
            }
            if(Number(s.dataset.value)===5){
                currentFill.style.width = Math.floor((100 * count_5) / data.length)+'%'
            }
        })

        let item = ''
        data.filter((d,index) => index >= (currentPage - 1) * perPage && index < currentPage * perPage)
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
                        <div class="review__data">${p.date}</div>
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

            pagination(currentPage, perPage, data.length)

            $howMany.textContent = `${Number(currentPage-1)*perPage+1} - ${Math.min(Number(currentPage)*perPage,data.length)}`


    }


    function pagination(page, perPage, length) {
        const url = new URL(window.location);
        const currentPage = page

        const totalPages =
            Math.floor(length / perPage) < length / perPage
                ? Math.floor(length / perPage) + 1
                : Math.floor(length / perPage)

    
        let paginationArray = Array.from(
            {
                length: totalPages
            },
            (value, index) => index + 1
        )

   

        let item

        if (currentPage > 1) {
            url.searchParams.set("page", 1);
            item = `
            <a
                class='pagination__first-page pagination__item'
                href="${url}"
            >
               <<
            </a>
            `

            $pagination.insertAdjacentHTML('beforeend', item)

        }

        if (currentPage > 1) {
            url.searchParams.set("page", currentPage - 1);

            item = `
            <a
                class='pagination_prev-page pagination__item'
                  href="${url}"
            >
               <
            </a>
            `
            $pagination.insertAdjacentHTML('beforeend', item)
        }




        paginationArray.forEach(p => {
            url.searchParams.set("page", p);
            let className


            if (p === (Number(currentPage))) {
                className = 'pagination__link pagination__link--active'

            } else {
                className = 'pagination__link'
            }


            item = `
          <div  class='pagination__item'>
                        <a
                            class="${className}"
                              href="${url}"
                        >
                            ${p}
                        </a>
                    </div>
            `


            $pagination.insertAdjacentHTML('beforeend', item)
        })

        if (totalPages > currentPage) {
            url.searchParams.set("page", currentPage + 1);
            item = `
           <a
                        class='pagination__next-page pagination__item'
                          href="${url}"
                    >
                        >
                    </a>
            `

            $pagination.insertAdjacentHTML('beforeend', item)

        }

        if (totalPages > currentPage) {
            url.searchParams.set("page", totalPages);

            item = `
          <a
                        class='pagination__last-page pagination__item'
                         href="${url}"
                    >
                        >>
                    </a>
            `
            $pagination.insertAdjacentHTML('beforeend', item)

        }

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






