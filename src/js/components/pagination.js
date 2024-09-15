

const pagLink = (pageLink,
    pageCurrent) => {

    const url = new URL(window.location);
    url.searchParams.set("page", pageLink);

    let className=""

    if(pageLink === pageCurrent ){
         className= "pagination__link active"
    }else{
        className= "pagination__link"

    }


    return `
    <a
     href=${url}
     class='${className}'
 >
     ${pageLink}
 </a>
     `

}

const pagMiddle = () => {
    return `
        <div class='pagination__middle'>
         </div>
        `
}

const pagLeft = () => {
    return `
        <div class='pagination__left'>
         </div>
        `
}

const pagRight = () => {
    return `
        <div class='pagination__right'>
         </div>
        `
}

const pagDotted = () => {
    return `<span class="pagination__dotted">...</span>
        `
}


const pagPrev = (pageCurrent,
    isDisabled) => {

    const urlPrev = new URL(window.location);
    const urlFirst = new URL(window.location);
    urlFirst.searchParams.set("page", 1);
    urlPrev.searchParams.set("page", pageCurrent - 1);

    return `
    <a
             href=${urlFirst}
             class='${isDisabled
            ? 'pagination__link  pagination__link--navigation disabled'
            : 'pagination__link  pagination__link--navigation'
        }'
         >
             &#129168;&#129168;
         </a>
         <a
             href=${urlPrev}
             class='${isDisabled
            ? 'pagination__link  pagination__link--navigation disabled'
            : 'pagination__link  pagination__link--navigation'
        }'
         >
             &#129168;
         </a>
      `
}


const pagNext = (
    pageCurrent,
    totalPages,
    isDisabled) => {

    const urlLast = new URL(window.location);
    const urlNext = new URL(window.location);
    urlLast.searchParams.set("page", totalPages);
    urlNext.searchParams.set("page", pageCurrent + 1);

    return `<a
				href=${urlNext}
				class='${isDisabled
            ? 'pagination__link  pagination__link--navigation disabled'
            : 'pagination__link  pagination__link--navigation'
        }'
			>
				&#129170;
			</a>
			<a
				href=${urlLast}
				class='${isDisabled
            ? 'pagination__link  pagination__link--navigation disabled'
            : 'pagination__link  pagination__link--navigation'
        }'
			>
				&#129170;&#129170;
			</a>
      `
}



export function pagination(perPage, length) {
    const $pagination = document.querySelector('.pagination');

    const pageCurrent = parseInt(new URL(window.location).searchParams.get('page')) || 1;


    const pageToShowFirstLast = 5
    const pageToShowMiddle = 3

    const totalPages =
        Math.floor(length / perPage) < length / perPage
            ? Math.floor(length / perPage) + 1
            : Math.floor(length / perPage)


    if (totalPages === 1) {
        return 
    }

   

    if (totalPages <= pageToShowFirstLast) {
       
        
        $pagination.insertAdjacentHTML('beforeend', pagMiddle())

        const $middle = document.querySelector('.pagination__middle')

        const pArray = Array.from(
            {
                length: totalPages
            },
            (_, index) => index + 1
        )


        pArray.forEach(p => {
            $middle.insertAdjacentHTML('beforeend', pagLink(p, pageCurrent))

        })

        return
    }

    
   
    if (pageCurrent + 1 <= pageToShowFirstLast) {
        
    
        $pagination.insertAdjacentHTML('beforeend', pagLeft())
        $pagination.insertAdjacentHTML('beforeend', pagMiddle())
        $pagination.insertAdjacentHTML('beforeend', pagRight())


        const $middle = document.querySelector('.pagination__middle')
        const $left = document.querySelector('.pagination__left')
        const $right = document.querySelector('.pagination__right')



        $left.insertAdjacentHTML('beforeend', pagPrev(pageCurrent, pageCurrent === 1))

        const pArray = Array.from(
            {
                length: pageToShowFirstLast
            },
            (_, index) => index + 1
        )

    

        pArray.forEach(p => {
            $middle.insertAdjacentHTML('beforeend', pagLink(p, pageCurrent))
        })

        $middle.insertAdjacentHTML('beforeend', pagDotted())
        $middle.insertAdjacentHTML('beforeend', pagLink(totalPages, pageCurrent))
        $right.insertAdjacentHTML('beforeend', pagNext(pageCurrent, totalPages, false))


        return
    }

    if (pageCurrent + pageToShowFirstLast > totalPages + 1) {

        const pArray = Array.from(
            {
                length: pageToShowFirstLast
            },
            (_, index) => totalPages - (pageToShowFirstLast - index - 1)
        )

        $pagination.insertAdjacentHTML('beforeend', pagLeft())
        $pagination.insertAdjacentHTML('beforeend', pagMiddle())
        $pagination.insertAdjacentHTML('beforeend', pagRight())


        const $middle = document.querySelector('.pagination__middle')
        const $left = document.querySelector('.pagination__left')
        const $right = document.querySelector('.pagination__right')

        $left.insertAdjacentHTML('beforeend', pagPrev(pageCurrent, false))

        $middle.insertAdjacentHTML('beforeend', pagLink(1, pageCurrent))
        $middle.insertAdjacentHTML('beforeend', pagDotted())

        pArray.forEach(p => {
            $middle.insertAdjacentHTML('beforeend', pagLink(p, pageCurrent))
        })

        $right.insertAdjacentHTML('beforeend', pagNext(pageCurrent, totalPages, pageCurrent === totalPages))


        return
    }
    

    const pArray = Array.from(
        {
            length: pageToShowMiddle
        },
        (_, index) => pageCurrent + index - 1
    )

   
    

    $pagination.insertAdjacentHTML('beforeend', pagLeft())
    $pagination.insertAdjacentHTML('beforeend', pagMiddle())
    $pagination.insertAdjacentHTML('beforeend', pagRight())


    const $middle = document.querySelector('.pagination__middle')
    const $left = document.querySelector('.pagination__left')
    const $right = document.querySelector('.pagination__right')

    $left.insertAdjacentHTML('beforeend', pagPrev(pageCurrent, false))

    $middle.insertAdjacentHTML('beforeend', pagLink(1, pageCurrent))
    $middle.insertAdjacentHTML('beforeend', pagDotted())

    pArray.forEach(p => {
        $middle.insertAdjacentHTML('beforeend', pagLink(p, pageCurrent))
    })

    $middle.insertAdjacentHTML('beforeend', pagDotted())
    $middle.insertAdjacentHTML('beforeend', pagLink(totalPages, pageCurrent))

    $right.insertAdjacentHTML('beforeend', pagNext(pageCurrent, totalPages, false))
    
}
