const $fixed = document.querySelectorAll('.fix-block');

const $burger = document.querySelector('.burger');
const $aside = document.querySelector('.aside');
const $shadow = document.querySelector('.shadow');
const $asideClose = document.querySelector('.aside__close');
const $poppers = document.querySelectorAll('.popper');

window.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        if ($shadow && $aside?.classList.contains('open')) {
            asideClose()
        }

        $poppers.forEach(p => {
            p.removeAttribute('data-show');
        })
    }
});

if ($burger) {
    $burger.addEventListener('click', function (e) {
        asideOpen()
    })
}
if ($asideClose) {
    $asideClose.addEventListener('click', function (e) {
        asideClose()
    })
}

if ($shadow) {
    $shadow.addEventListener('click', function (e) {
        asideClose()

    })
}

function asideClose() {
    enableScroll()
    $aside.classList.remove('open')
    $shadow.classList.remove('open')
}

function asideOpen() {
    disableScroll()
    $aside.classList.add('open')
    $shadow.classList.add('open')
}

export function disableScroll() {
    let pagePosition = window.scrollY;
    lockPadding();
    document.body.classList.add('noscroll');
    document.body.dataset.position = String(pagePosition);
    document.body.style.top = -pagePosition + 'px';
}

export function enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position || '', 10);
    unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('noscroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
}

function lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

    document.body.style.paddingRight = paddingOffset;

    $fixed.forEach((el) => {
        el.style.paddingRight = paddingOffset;
    });
}

function unlockPadding() {

    document.body.style.paddingRight = '0px';
    $fixed.forEach((el) => {
        el.style.paddingRight = '0px';
    });
}