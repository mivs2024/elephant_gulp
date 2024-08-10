
const reviewsCount = 6
if (window.location.pathname.includes('product')) {
    const $reviews = document.querySelector('.product-reviews__body');
    const $reviewsNumber = document.querySelector('.product-reviews__number');

    setReviews()

    async function setReviews() {

        const res = await fetch('./resources/reviews.json')
        const data = await res.json();

        $reviewsNumber.textContent = `${reviewsCount} из ${data.length}`

        data.filter(d=>d.id<=reviewsCount)
        .forEach(p => {
            item = `
                   <div class="product-reviews__review review">
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

        const $reviewsItems = $reviews.querySelectorAll('.rating');
        $reviewsItems.forEach(r => {
            const ratingValue = r.dataset.value
            const ratingFill = r.querySelector('.rating__fill')
            ratingFill.style.width = Math.floor((100 * ratingValue) / 5)+'%'
            
        })


    }


}






