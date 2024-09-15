import { createPopper } from '@popperjs/core';
import { getCookies, getParents, getTopParent, isChild, isFirstChild } from './utils.js';

export async function setMenu(cat, dataMenu) {

    const arrMenuTop = []
    const arrMenuBottom = []

    const $headerTop = document.querySelector('.header-shop__left');
    const $headerTopMobile = document.querySelector('.header-shop__mobile .container2');
    const $menuMobile = document.querySelector('.menu-shop__mobile');
    const $burgerMobile = document.querySelector('.burger-mobile');
    const $mobileClose = document.querySelector('.mobile-close');
    const $menuBottom = document.querySelector('.menu-shop');
    const $userWishlist = document.querySelectorAll('.header-shop__star');
    const $userCart = document.querySelectorAll('.header-shop__cart');
    const $userLogin = document.querySelectorAll('.header-shop__login');


    const userProfile = getCookies()

    if (userProfile) {

        $userLogin.forEach(el => {
            el.textContent = userProfile.substring(0, 1)
            el.setAttribute('href', '/elephant/user.html')
            el.classList.add('logged')

        })

        // setPopper({ name: 'Anonimus', email: userProfile })


    }


    $burgerMobile.onclick = () => {
        document.querySelector('.header-shop').classList.toggle('mobile-show')

        $burgerMobile.classList.toggle('burger-mobile--active')
    }

    $mobileClose.onclick = () => {
        document.querySelector('.header-shop').classList.toggle('mobile-show')

        $burgerMobile.classList.toggle('burger-mobile--active')
    }



    const catTop = getTopParent(cat)


    dataMenu.forEach(c => {
        if (c.id.split('.').length === 1) {
            arrMenuTop.push(c)
        }

        if (isFirstChild(catTop, c.id)) {
            arrMenuBottom.push(c)
        }
    });


    let item = ''
    let item2 = ''

    arrMenuTop
        .forEach(p => {
            if (catTop === p.id) {

                item = `
                 <div class = "header-shop__item  is-active">

                   <a href="/elephant/catalog.html?cat=${p.slug}" class="header-shop__link text" >${p.name}</a>
                 </div>
    
                    `
                item2 = `
                   <a href="/elephant/catalog.html?cat=${p.slug}" class="menu-shop__mobile-link text is-active" >${p.name}</a>
    
                    `

            } else {
                item = `
                 <div class = "header-shop__item">

                   <a href="/elephant/catalog.html?cat=${p.slug}" class="header-shop__link text" >${p.name}</a>
                 </div>
    
                    `

                item2 = `
                    <a href="/elephant/catalog.html?cat=${p.slug}" class="menu-shop__mobile-link text" >${p.name}</a>
     
                     `

            }


            $headerTop.insertAdjacentHTML('afterbegin', item)

            $headerTopMobile.insertAdjacentHTML('afterbegin', item)

            $menuMobile.insertAdjacentHTML('afterbegin', item2)
        })



    arrMenuBottom
        .forEach(p => {
            item = `
                 <div class = "menu-shop__item" data-cat="${p.id}">
                    <div class="menu-shop__item-mobile">
                      <span class='text-600'>${p.name}</span>
                      <span class='arrow-down'>&#11167;</span>
                    </div>
                   <a href="/elephant/catalog.html?cat=${p.slug}" class="menu-shop__link text" >${p.name}</a>
                   <div class="menu-shop__submenu submenu">
                   </div>
                </div>
                    `
            $menuBottom.insertAdjacentHTML('beforeend', item)
        })


    const $menuItemsMobile = document.querySelectorAll('.menu-shop__item-mobile');


    $menuItemsMobile.forEach(el => {

        el.onclick = () => {
            el.closest('.menu-shop__item').classList.toggle('open')
        }

    })

    const $menuBottomItems = document.querySelectorAll('.menu-shop__item');

    $menuBottomItems.forEach(m => {
        const $submenu = m.querySelector(".menu-shop__submenu")
        const cat = m.dataset.cat
        dataMenu.forEach(m => {
            if (isChild(cat, m.id) && cat !== m.id) {
                item = `
            <div class = "submenu__item"">
              <a href="/elephant/catalog.html?cat=${m.slug}" class="submenu__link text" >${m.name}</a>
           </div>
               `
                $submenu.insertAdjacentHTML('afterbegin', item)
            }
        })


    })

    const $breadcrumbs = document.querySelector('.breadcrumbs');


    const parents = getParents(cat);

    parents.forEach(p => {
        const { name, slug } = dataMenu.filter(d => d.id === p)[0]
        if (p !== cat) {

            item = `
                 <li class="breadcrumbs__item">
                        <a href="/elephant/catalog.html?cat=${slug}" class="breadcrumbs__link">${name}</a>
                    </li>
                   `
            $breadcrumbs.insertAdjacentHTML('beforeend', item)
        }

    })



    if (parents.length > 1) {

        item = `
        <li class="breadcrumbs__item">
                <a href="/elephant/catalog.html?cat=sloniham" class="breadcrumbs__link">Магазин</a>
            </li>
          `
        $breadcrumbs.insertAdjacentHTML('afterbegin', item)
    }


    function setPopper(user) {
        const $trigger = document.querySelector('.header-shop__login');
        const $popper = document.querySelector('.popper-user');

        $popper.querySelector('.popper-user__name').textContent = user.name
        $popper.querySelector('.popper-user__email').textContent = user.email

        const popperInstance = createPopper($trigger, $popper, {
            placement: 'bottom-start', modifiers: {}
        });

        function show() {
            $popper.setAttribute('data-show', '');

            // We need to tell Popper to update the tooltip position
            // after we show the tooltip, otherwise it will be incorrect
            popperInstance.update();
            // setRivewsGraph($reviewsGraph, reviewsValues, dataReviews.length)
        }

        function hide() {
            $popper.removeAttribute('data-show');
        }

        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];

        showEvents.forEach((event) => {
            $trigger.addEventListener(event, show);
        });

        hideEvents.forEach((event) => {
            $popper.addEventListener(event, hide);
        });

    }

}