const $images = document.querySelectorAll('.product-media__item');
const $mainImage = document.querySelector('.product-media__main-image img');

const $videos = document.querySelectorAll('.product-media__item--video');
const $mainVideo = document.querySelector('.product-media__main-video video');


if ($images) {
    $images.forEach(t => {
        t.addEventListener('click', (e) => {
            const img = e.currentTarget.querySelector('img')

            const src = img.getAttribute('src')
            $mainImage.style.opacity=0
            setTimeout(() => {
                $mainImage.style.opacity=1
                $mainImage.setAttribute('src', src)
            }, 300);

            removeActive($images)
            t.classList.add('product-media__item--active')
           
        })

    })
}

if ($videos) {
    $videos.forEach(t => {
        t.addEventListener('click', (e) => {
            const img = e.target.querySelector('img')

            const src = img.getAttribute('src').replace('cover.png','')+'video.mp4'
            $mainVideo.setAttribute('src', src)
            $mainVideo.load()
            $mainVideo.init()
            removeActive($videos)
            e.target.classList.add('product-media__item--active')
           
        })

    })
}


function removeActive(items) {
    items.forEach(t => {
        t.classList.remove('product-media__item--active')
    })
}
