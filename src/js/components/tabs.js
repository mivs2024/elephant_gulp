
const $tabs = document.querySelectorAll('.tabs');


if ($tabs) {
    $tabs.forEach(t => {
        const currentTabs = t.querySelectorAll('[data-tab]')

        currentTabs.forEach(ct => {

           
            ct.addEventListener('click', (e) => {
                removeActiveClass(currentTabs);
                removeActiveTarget(currentTabs)
                addActiveClass(ct)
                addActiveTarget(ct)
            })
        })
    })
}

init()


export function init() {
    if ($tabs) {
        $tabs.forEach(t => {
            const firstTab = t.querySelector('.active[data-tab]')
            const currentTabs = t.querySelectorAll('[data-tab]')


            removeActiveClass(currentTabs);
            removeActiveTarget(currentTabs)
            addActiveClass(firstTab)
            addActiveTarget(firstTab)
           
        })
    }

}

function removeActiveClass(currentTabs) {
    currentTabs.forEach(ct => {
        ct.classList.remove('active')
    })
}

function removeActiveTarget(currentTabs) {
    currentTabs.forEach(ct => {
        const currentId = ct.dataset.tab
        const currentTarget = document.querySelector(`[data-target="${currentId}"]`)
        if (currentTarget)
            currentTarget.style.display = 'none';

    })
}

function addActiveClass(currentTab) {
    currentTab.classList.add('active')
}

function addActiveTarget(currentTab) {
    const currentId = currentTab.dataset.tab
    const currentTarget = document.querySelector(`[data-target="${currentId}"]`)
    if (currentTarget)
        currentTarget.style.display = 'grid';

}
