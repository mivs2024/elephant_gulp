if (window.location.pathname.includes('index')) {
    const $slider = document.querySelector('.popular-products-slider .swiper-wrapper');

    setSlider()

    async function setSlider() {

        const res = await fetch('./resources/products.json')
        const data = await res.json();


        data.filter(d => d.id <= 10)
            .forEach(p => {
                item = `
                    <div class="swiper-slide popular-products__slide">
                        <article class="card-product">
                            <a href="/product.html?id=${p.id}" class="card-product__link">
                                <div class="card-product__images">
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[0]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[1]}" alt="card-image">
                                    </div>
                                    <div class="card-product__image">
                                        <img src="/images/shop/${p.images[2]}" alt="card-image">
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

    }

}