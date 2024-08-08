import Choices from 'choices.js' ;


const selects = document.querySelectorAll('.form-field__select');
if(selects){

    selects.forEach(el => {
      new Choices(el, {
        shouldSort: false,
        position: 'bottom',
        searchEnabled: false,
        itemSelectText: ''
      });
    });
}