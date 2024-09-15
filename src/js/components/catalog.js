import sleep from 'sleep-promise';
import { setMenu } from './menu-shop.js';
import { isChild } from './utils.js';
const $inputs = document.querySelectorAll('.checkbox input');
const $catalog = document.querySelector('.catalog__results');
const $loader = document.querySelector('.loader');
const $filtersTop = document.querySelector('.catalog__filters-top');
const $filtersItemToggle = document.querySelectorAll('.filter-item__title');
const $filtersMobileBrand = document.querySelector('.filter-item__mobile--brand');
const $filtersMobilePrice = document.querySelector('.filter-item__mobile--price');


import noUiSlider from 'nouislider';
import { perPage } from './constants.js';
import { pagination } from './pagination.js';

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
      
    const productsToShow = []
    const brands = new URL(window.location).searchParams.get('brand');
    const minPrice = new URL(window.location).searchParams.get('minPrice');
    const maxPrice = new URL(window.location).searchParams.get('maxPrice');
    const currentPage = new URL(window.location).searchParams.get('page') || 1;

    const cat = new URL(window.location).searchParams.get('cat');

    const resProducts = await fetch('./resources/products.json')
    const dataProducts = await resProducts.json();

    const resMenu = await fetch('./resources/menu.json')
    const dataMenu = await resMenu.json();
    const { id: currentCat, name: currentCatName } = dataMenu.filter(el => el.slug === cat)[0]

    const dataProductsCat = dataProducts.filter(el => isChild(currentCat, el.category))

    dataProductsCat.forEach(c => {

        if (brands) {
            if (brands?.includes(c.brand)) {

                productsToShow.push(c)
            }
        } else {
            productsToShow.push(c)
        }
    });


    const $title = document.querySelector('.catalog__title');
    const $resCount = document.querySelector('.catalog__res-count');

    $title.textContent = `${currentCatName}`
    $resCount.textContent = `${dataProductsCat.length} товаров`

    setBrandsFilters(brands);
    setPriceFilters(minPrice, maxPrice);
    setFiltersTop()
    setCatalog(currentPage,  productsToShow);
    setMenu(currentCat, dataMenu)

    const $filtersToggle = document.querySelector('.catalog__filters-toggle');
    const $filtersClose = document.querySelector('.catalog__filters-mobile-close');
    const $filtersItemClose = document.querySelectorAll('.filter-item__mobile-close');
    const $filters = document.querySelector('.catalog__filters');


    $filtersToggle.onclick = () => {
        $filters.classList.toggle('mobile-show')
    }


    $filtersClose.onclick = () => {
        $filters.classList.toggle('mobile-show')
    }


    $filtersItemToggle.forEach(el => {

        el.onclick = () => {
            el.closest('.filter-item').classList.toggle('open')
        }

    })


    $filtersItemClose.forEach(el => {

        el.onclick = () => {
            el.closest('.filter-item').classList.toggle('open')
        }

    })


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
                    updateQueryParamsBrand($currentName, true);

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
                $filtersMobileBrand.insertAdjacentHTML('afterbegin', `<span class='text-sm'>${$currentName}</span>`)


            }

            i.addEventListener('change', (e) => {
                if (e.currentTarget.checked)
                    updateQueryParamsBrand($currentName);
                else
                    updateQueryParamsBrand($currentName, true);

            })
        })
    }


}


function setPriceFilters(minPrice_, maxPrice_) {

    if (minPrice_ || maxPrice_) {
        $filtersTop.insertAdjacentHTML('afterbegin', generateFilterTop(`от ₽ ${minPrice_ || minPriceStart} до ₽ ${maxPrice_ || maxPriceStart}`))

        $filtersMobilePrice.insertAdjacentHTML('afterbegin', `<span class='text-sm'>${minPrice_ || minPriceStart} - ${maxPrice_ || maxPriceStart}</span>`)

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
                    <a  href="/elephant/product.html?id=${product.id}" class="card-c__link">
                        <div class="card-c__images">
                            <div class="card-c__image">
                                <img src="/elephant/images/shop/${product.images[0]}" alt="card-image">
                            </div>
                            <div class="card-c__image">
                                <img src="/elephant/images/shop/${product.images[1]}" alt="card-image">
                            </div>
                            <div class="card-c__image">
                                <img src="/elephant/images/shop/${product.images[2]}" alt="card-image">
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



async function setCatalog(currentPage,  dataProducts) {
    $loader.classList.add('is-open')
    await sleep(1000);
    $loader.classList.remove('is-open')
    dataProducts.forEach((p, index) => {
        if (index >= (currentPage - 1) * perPage && index < currentPage * perPage)
            $catalog.insertAdjacentHTML('afterbegin', generateCard(p))

    })

    pagination(perPage, dataProducts.length)

}





