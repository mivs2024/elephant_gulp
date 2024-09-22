
window.map = null;

const LOCATION = {
    center: [
       100.61050799999997, 13.729276927316626
    ],
    zoom: 9 // starting zoom
};

const mapElement = document.getElementById('map')
const mapPlaces = document.querySelector('.contacts-map__list')

if(mapElement&&mapPlaces){
    main();
}
async function main() {
    // Waiting for all api elements to be loaded
    await ymaps3.ready;

   
    const {YMap, YMapDefaultSchemeLayer, YMapFeatureDataSource, YMapLayer, YMapMarker, YMapControls, YMapControl} =
        ymaps3;

    // Load the package with the cluster, extract the classes for creating clusterer objects and the clustering method
    const {YMapClusterer, clusterByGrid} = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');


    map = new YMap(document.getElementById('map'), {location: LOCATION, showScaleInCopyrights: true});
    
    // Create and add to the map a layer with a map schema, data sources, a layer of markers
    map.addChild(new YMapDefaultSchemeLayer({}))
        .addChild(new YMapFeatureDataSource({id: 'clusterer-source'}))
        .addChild(new YMapLayer({source: 'clusterer-source', type: 'markers', zIndex: 1800}));

    // You can set any markup for the marker and for the cluster
    const contentPin = document.createElement('div');
    contentPin.classList.add("contacts-map__pin") ;
    contentPin.classList.add("pin") ;
    contentPin.innerHTML = '<img src="/ images/elephant.svg" class="pin__img"> ';

    /* We declare the function for rendering ordinary markers, we will submit it to the clusterer settings.
    Note that the function must return any Entity element. In the example, this is ymaps3.YMapMarker. */
    const marker = (feature) =>
        new YMapMarker(
            {
                coordinates: feature.geometry.coordinates,
                source: 'clusterer-source'
            },
            contentPin.cloneNode(true) 
        );

    // As for ordinary markers, we declare a cluster rendering function that also returns an Entity element.
    const cluster = (coordinates, features) =>
        new YMapMarker(
            {
                coordinates,
                source: 'clusterer-source'
            },
            circle(features.length).cloneNode(true) 
        );

    function circle(count) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.innerHTML = `
            <div class="circle-content">
                <span class="circle-text">${count}</span>
            </div>
        `;
        return circle;
    }

    /* We create a clusterer object and add it to the map object.
    As parameters, we pass the clustering method, an array of features, the functions for rendering markers and clusters.
    For the clustering method, we will pass the size of the grid division in pixels. */
   
    let pointsArray = []
    const res = await fetch('./resources/map.json')
        .then(response => response.json())
        .then(json => {
            pointsArray = json.map(s => (
                {
                   id:s.id,
                   type:'Feature',
                   name:s.name,
                    geometry: {
                        type: 'Point', coordinates: [
                            parseFloat(s.location[1]), parseFloat(s.location[0])
                        ]
                    }
                }
            ))
           
        })

   
    const clusterer = new YMapClusterer({
        method: clusterByGrid({gridSize: 64}),
        features: pointsArray,
        marker,
        cluster
    });
    map.addChild(clusterer);

    pointsArray.forEach((p,index) => {
        item = `
          <li class="contacts-map__item contacts-place" >
                        <div class="contacts-place__name">${p.name}
                        <span class="contacts-place__show" data-target="${index}">показать на карте</span>
                        </div>
                        <div class="contacts-place__wrapper">
                            <span class="contacts-place__label">Call :</span>
                            <a href="tel:1285" class="contacts-place__call contacts-place__value">
                                <span>1285</span>
                            </a>
                        </div>
                        <div class="contacts-place__wrapper">
                            <span class="contacts-place__label">Email :</span>
                            <a href="mailto:elephant@tai.co.th" class="contacts-place__email  contacts-place__value">
                                <span>elephant@tai.co.th</span>
                              </a>
                        </div>
                        <div class="contacts-place__wrapper">
                            <span class="contacts-place__label">Sheduler :</span>
                            <a href="mailto:elephant@tai.co.th" class="contacts-place__sheduler  contacts-place__value">
                                <span>Mon - Fri 9:00 - 18:00</span>
                              </a>
                        </div>
                    </li>
            `


            mapPlaces.insertAdjacentHTML('beforeend', item)
    })

    mapPlaces.addEventListener('click',(e)=>{
        const show = e.target.closest('.contacts-place__show')
        if(show){
            const new_place = pointsArray[show.dataset.target]
            const new_location = {
                center: [
                    new_place.geometry.coordinates[0],new_place.geometry.coordinates[1]
                ],
                zoom: 15 // starting zoom
            };
            
            // console.log(new_location.geometry.coordinates)
            map.update({location: {...new_location}});
        }
    })

 
   

    
}
