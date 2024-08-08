import { enableScroll ,disableScroll} from "."

const $modals = document.querySelectorAll('.modal');
const $fixed = document.querySelectorAll('.fix-block');
const $closeModals = document.querySelectorAll('.modal__close');

window.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        if ($modals) {
            $modals.forEach(m => {
                m.classList.remove('is-open')
                enableScroll()
            })
        }
    }
});

if($closeModals){
    $closeModals.forEach(cm=>{
        const modal = cm.closest('.modal')
        const modalContainer = cm.closest('.modal__container')
        cm.addEventListener('click',(e=>{
            enableScroll()
            modal.classList.remove('is-open')
            modalContainer.classList.remove('modal-open')
        }))
    })
}


