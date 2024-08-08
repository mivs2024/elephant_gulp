import noUiSlider from 'nouislider'

const rangeSlider = document.getElementById('range-slider') 
if(rangeSlider){

  const slider=noUiSlider.create(rangeSlider, {
    start: [1000, 10000],
    connect: true,
    step: 50,
    range: {
      min: [500],
      max: [15000],
    },
    tooltips: [ { to: function(value) { return '₽ ' +  value.toFixed(); }},
      { to: function(value) { return '₽ ' + value.toFixed(); }}
    ],
  })
  slider.on('update', function (values, handle) {
   console.log(values);
   console.log(handle);
  });
}
