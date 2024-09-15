import Cookies from "js-cookie";

const cookieName = 'elephant'
// 13.42.3 => 13,13.42,13.42.3
export function getParents(cat) {
    const res = []
    const arr2 = []
    const arr = cat.split('.')

    arr.forEach(el => {
        arr2.push(el)
        res.push(arr2.join('.'))
    });
    return res
}

export function getTopParent(cat) {
    const arr = cat.split('.')
    return arr[0]
}

// 1.2.3 => 1.2.3.1,1.2.3.2,1.2.3.3
export function isFirstChild(parent, child) {
    const arrChildLength = child.split('.').length
    const arrParentLength = parent.split('.').length

    let res = child.indexOf(parent);

    if (res === 0 && arrParentLength === arrChildLength - 1) {
        return true
    }
    return false

}

export function isChild(parent, child) {


    let res = child.indexOf(parent);

    if (res === 0) {
        return true
    }
    return false

}

export function setRivewsGraph(graphElement, reviewsValues,reviewsCount) {

    let count_5 = reviewsValues[4]
    let count_4 = reviewsValues[3]
    let count_3 = reviewsValues[2]
    let count_2 = reviewsValues[1]
    let count_1 = reviewsValues[0]

 

    const $scoringItems = graphElement.querySelectorAll('.rating-graph__scoring-row');


    

    $scoringItems.forEach(s => {

        const currentFill = s.querySelector('.rating-graph__scoring-fill')
     
        currentFill.style.width = 0
    })
 
    setTimeout(()=>{

        $scoringItems.forEach((s,index) => {
    
            s.querySelector('.rating-graph__scoring-count').textContent = reviewsValues[4-index]
            const currentFill = s.querySelector('.rating-graph__scoring-fill')
           
           
    
            if (Number(s.dataset.value) === 1) {
                currentFill.style.width = Math.floor((100 * count_1) / reviewsCount) + '%'
            }
            if (Number(s.dataset.value) === 2) {
                currentFill.style.width = Math.floor((100 * count_2) / reviewsCount) + '%'
            }
            if (Number(s.dataset.value) === 3) {
                currentFill.style.width = Math.floor((100 * count_3) / reviewsCount) + '%'
            }
            if (Number(s.dataset.value) === 4) {
                currentFill.style.width = Math.floor((100 * count_4) / reviewsCount) + '%'
            }
            if (Number(s.dataset.value) === 5) {
                currentFill.style.width = Math.floor((100 * count_5) / reviewsCount) + '%'
            }
        })
    },300)
 


}


export const saveCookies = (user) => {
    Cookies.set(cookieName, user,
        {   
            sameSite: 'Lax',
            expires: 9
        }
    )
}

export const getCookies = () => {
	const res = Cookies.get(cookieName)
	return res || null
}

export const removeCookie = () => {
	Cookies.remove(cookieName)
	
}
