import { getParents, getTopParent, isFirstChild, isChild } from './utils.js'

export async function setMenu(cat, dataMenu) {

    const arrMenuTop = []
    const arrMenuBottom = []

    const $menuTop = document.querySelector('.menu-shop--top');
    const $menuBottom = document.querySelector('.menu-shop--bottom');



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

    arrMenuTop
        .forEach(p => {
            if (catTop === p.id) {
                item = `
                 <div class = "menu-shop__item  is-active" ">

                   <a href="catalog.html?cat=${p.slug}" class="menu-shop__link" alt="menu-link">${p.name}</a>
                 </div>
    
                    `
            } else {
                item = `
                 <div class = "menu-shop__item" ">

                   <a href="catalog.html?cat=${p.slug}" class="menu-shop__link" alt="menu-link">${p.name}</a>
                 </div>
    
                    `

            }


            $menuTop.insertAdjacentHTML('afterbegin', item)
        })

    arrMenuBottom
        .forEach(p => {
            item = `
                 <div class = "menu-shop__item" data-cat="${p.id}">
                   <a href="catalog.html?cat=${p.slug}" class="menu-shop__link" alt="menu-link">${p.name}</a>
                   <div class="menu-shop__submenu submenu">
                   </div>
                </div>
                    `
            $menuBottom.insertAdjacentHTML('afterbegin', item)
        })


    const $menuBottomItems = document.querySelectorAll('.menu-shop--bottom .menu-shop__item');

    $menuBottomItems.forEach(m => {
        const $submenu = m.querySelector(".menu-shop__submenu")


        const cat = m.dataset.cat

        dataMenu.forEach(m => {
            if (isChild(cat, m.id)) {
                item = `
            <div class = "submenu__item"">
              <a href="catalog.html?cat=${m.slug}" class="submenu__link" alt="submenu-link">${m.name}</a>
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
                        <a href="catalog.html?cat=${slug}" class="breadcrumbs__link">${name}</a>
                    </li>
                   `
            $breadcrumbs.insertAdjacentHTML('beforeend', item)
        }

    })



}