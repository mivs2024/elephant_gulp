const $dropdowns = document.querySelectorAll('.dropdown');


if ($dropdowns) {
    $dropdowns.forEach(d => {
        const $top = d.querySelector('.dropdown__top')
        $top.addEventListener('click', (e) => {
            d.classList.toggle('open')
            d.scrollIntoView({behavior:'smooth',block:'center'})

        })

    })
}


