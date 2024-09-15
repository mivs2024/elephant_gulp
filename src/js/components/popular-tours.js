if (window.location.pathname.includes('index')) {
    const $tours = document.querySelector('.tours__inner');

    setTours()

    async function setTours() {

        const res = await fetch('./resources/tours.json')
        const data = await res.json();
        console.log(data);
        


        data.filter(d => d.id <= 5)
            .forEach(p => {
                item = `
                    <div class="tours__card card-t">

                <a href="/elephant/tour.html?id=${p.id}" class="card-t__link">
                    <img class="card-t__img" src="/elephant/images/tours/${p.images[0]}" alt="image-tour">
                    <div class="card-t__content">
                        <img class="card-t__icon" width="30" height="30" src="/elephant/images/leaf.svg" alt="image-tour">
                        <span class="card-t__text text">View more</span>

                    </div>
                </a>

                <div class="card-t__name text-sm">
                    <span>Путешествие - 3 дня</span>
                </div>
                <a href="/elephant/tour.html?id=${p.id}" class="card-t__descr-link text">
                ${p.name}

                </a>
            </div>
                    `


                $tours.insertAdjacentHTML('afterbegin', item)
            })

    }

}