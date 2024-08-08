import './components/slider'
import './components/map'
// import './components/range-slider'
import './components/aside'
import './components/modal'
import './components/player'
import './components/smooth-scroll'
import './components/tabs'
import './components/media'
import './components/product'
import './components/dropdown'
import './components/selects'
import './components/header'
import './components/catalog'
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

  export const getQueryParams = (key) => {
    const url = new URL(window.location);
    console.log(url.searchParams.toString());
    return url.searchParams.get(key);
  };

