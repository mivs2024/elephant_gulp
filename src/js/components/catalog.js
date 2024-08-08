import sleep from 'sleep-promise';
const $inputs = document.querySelectorAll('.checkbox input');
const $count = document.querySelector('.catalog__count');
const $catalog = document.querySelector('.catalog__results');
const $pagination = document.querySelector('.catalog__pagination');
const $loader = document.querySelector('.loader');
const $filtersTop = document.querySelector('.catalog__filters-top');


import noUiSlider from 'nouislider'

const minPrice = 500
const maxPrice = 20000

const minPriceStart = 500
const maxPriceStart = 10000

const rangeSlider = document.getElementById('range-slider')
if (rangeSlider) {

    const slider = noUiSlider.create(rangeSlider, {
        start: [minPriceStart, maxPriceStart],
        connect: true,
        step: 50,
        range: {
            min: [minPrice],
            max: [maxPrice],
        },
        tooltips: [{ to: function (value) { return '₽ ' + value.toFixed(); } },
        { to: function (value) { return '₽ ' + value.toFixed(); } }
        ],
    })

    slider.on('change', function (values, handle) {

        if (handle === 0) {
            updateQueryParamsPrice(values[0], null)
        }
        if (handle === 1) {
            updateQueryParamsPrice(null, values[1])
        }
    });
}

if (window.location.pathname.includes('catalog')) {
    const perPage = 8
    const brands = new URL(window.location).searchParams.get('brand');
    const minPrice = new URL(window.location).searchParams.get('minPrice');
    const maxPrice = new URL(window.location).searchParams.get('maxPrice');
    const currentPage = new URL(window.location).searchParams.get('page') || 1;

    setBrandsFilters(brands);
    setPriceFilters(minPrice, maxPrice);
    setFiltersTop()
    setCatalog(brands, currentPage, perPage);
}

function setFiltersTop() {
    if ($filtersTop) {
        $filtersTop.addEventListener('click', (e) => {
            const $close = e.target.closest('.filter-top__icon')
            if ($close) {
                const $currentName = $close
                    .closest('.filter-top')
                    .querySelector('.filter-top__name')
                    .textContent;

                if ($currentName.includes('₽')) {

                    updateQueryParamsPrice(null, null, true);
                } else {
                    updateQueryParamsBrand( $currentName, true);

                }

            }

        })

    }
}
function setBrandsFilters(brands) {

    if ($inputs) {
        $inputs.forEach(i => {


            const $currentName = i.closest('.checkbox').querySelector('.checkbox__text').textContent
            if (brands?.includes($currentName)) {
                i.checked = true
                $filtersTop.insertAdjacentHTML('afterbegin', generateFilterTop($currentName))


            }

            i.addEventListener('change', (e) => {
                if (e.currentTarget.checked)
                    updateQueryParamsBrand( $currentName);
                else
                    updateQueryParamsBrand( $currentName, true);

            })
        })
    }


}


function setPriceFilters(minPrice_, maxPrice_) {

    if (minPrice_ || maxPrice_) {
        $filtersTop.insertAdjacentHTML('afterbegin', generateFilterTop(`от ₽ ${minPrice_ || minPriceStart} до ₽ ${maxPrice_ || maxPriceStart}`))
    }

    rangeSlider.noUiSlider.set([minPrice_, maxPrice_]);

}

const updateQueryParamsBrand = (value, del = false) => {
    const url = new URL(window.location);
    url.searchParams.delete("page")
    const currentValue = url.searchParams.get("brand")
    if (del) {
        const newArr = currentValue.split(',').filter(f => f !== value)
        if (newArr.length === 0) {
            url.searchParams.delete("brand");
        } else {

            url.searchParams.set("brand", newArr.join(','));

        }


    } else {
        if (currentValue) {

            url.searchParams.set("brand", currentValue + ',' + value);
        } else {
            url.searchParams.set("brand", value);

        }

    }
    window.location.replace(url)

};

const updateQueryParamsPrice = (minPrice_, maxPrice_, del = false) => {
    const url = new URL(window.location);
    url.searchParams.delete("page")

    if (del) {
        url.searchParams.delete("minPrice")
        url.searchParams.delete("maxPrice")
    } else {
        if (minPrice_) {
            url.searchParams.set("minPrice", minPrice_);
        }
        if (maxPrice_) {
            url.searchParams.set("maxPrice", maxPrice_);
        }
    }

    window.location.replace(url)

};


function generateCard(product) {
    return `
    <article class="card-c">
                    <div class="card-c__label">${product.brand}${product.id}</div>
                    <a href="product.html" class="card-c__link">
                        <div class="card-c__images">
                            <div class="card-c__image">
                                <img src="/images/card-products/${product.images[0]}" alt="card-image">
                            </div>
                            <div class="card-c__image">
                                <img src="/images/card-products/${product.images[1]}" alt="card-image">
                            </div>
                            <div class="card-c__image">
                                <img src="/images/card-products/${product.images[2]}" alt="card-image">
                            </div>
                        </div>
                        <div class="card-c__price">
                            <span class="card-c__price-current">
                               ${product.price}&thinsp;₽
                            </span>
                            <span class="card-c__price-prev">
                            ${product.prevPrice}&thinsp;₽
                            </span>
                            <span class="card-c__price-discount">
                                -50%
                            </span>
                        </div>
                        <h3 class="card-c__title">
                        ${product.name}
                        </h3>

                         <div class="card-c__rating">
                            <span> ${product.rating}</span>
                            <span class="card-c__reviews">456 отзывов</span>

                        </div>
                       
                    </a>
                </article>
    `
}

function generateFilterTop(text) {
    return `
    <div class="filter-top">
                        <span  class="filter-top__name">${text}</span>
                        <span class="filter-top__icon  fa-close"></span>
                    </div>
    `
}



async function setCatalog(brands, currentPage, perPage) {

    let prodArrayToShow = []
    $loader.classList.add('is-open')
    await sleep(1000);
    const res = await fetch('./resources/products.json')
        .then(response => response.json())
        .then(json => {

            $loader.classList.remove('is-open')
            json.forEach(c => {

                if (brands) {
                    if (brands?.includes(c.brand)) {

                        prodArrayToShow.push(c)
                    }
                } else {
                    prodArrayToShow.push(c)
                }
            });
        })


    prodArrayToShow.forEach((p, index) => {
        if (index >= (currentPage - 1) * perPage && index < currentPage * perPage)
            $catalog.insertAdjacentHTML('afterbegin', generateCard(p))

    })

    $count.textContent = `${prodArrayToShow.length} товаров`

    pagination(currentPage, perPage, prodArrayToShow.length)

}

function pagination(page, perPage, length) {
    const url = new URL(window.location);
    const currentPage = page

    const pagesMaxRightOffset = 3
    const pagesForShow = 8
    const totalPages =
        Math.floor(length / perPage) < length / perPage
            ? Math.floor(length / perPage) + 1
            : Math.floor(length / perPage)

    const pagesRemain = totalPages - currentPage

    const pagesEnd = currentPage + Math.min(pagesRemain, pagesMaxRightOffset)
    const pagesStart = pagesEnd - 8

    let paginationArray = Array.from(
        {
            length: totalPages
        },
        (value, index) => index + 1
    )

    // console.log(paginationArray);
    // if (currentPage <= 4) {
    //     paginationArray = paginationArray.filter(p => p >= 1 && p <= pagesForShow)
    // } else {
    //     paginationArray = paginationArray.filter(
    //         p => p > pagesStart && p <= pagesEnd
    //     )
    // }

    // console.log(paginationArray);

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


