const $header = document.querySelector('.header');
if ($header) {

    let y = window.scrollY;
    if (y > 0) {
        $header.classList.remove('header--transparent')
    } else
        $header.classList.add('header--transparent')

        window.addEventListener('scroll', () => {
            let y = window.scrollY;
            if (y > 0) {
                $header.classList.remove('header--transparent')
            } else
                $header.classList.add('header--transparent')
    });
}

