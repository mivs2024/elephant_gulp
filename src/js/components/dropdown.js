const $dropdowns = document.querySelectorAll('.dropdown');


if ($dropdowns) {
    $dropdowns.forEach(d => {
        const $top = d.querySelector('.dropdown__top')
        const $body = d.querySelector('.dropdown__body')
        $top.addEventListener('click', (e) => {
            d.classList.toggle('open')
        })

    })
}


