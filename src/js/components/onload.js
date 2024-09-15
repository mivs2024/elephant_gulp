import { removeCookie } from "./utils";

if (window.location.pathname.includes('logout')) {
    removeCookie()
     document.location.href= document.location.origin+document.location.pathname+ '?cat=sloniham'

}


if(document.location.pathname==='/'){
    
    document.location.href= document.location.origin+document.location.pathname+ 'elephant/index.html'

    // document.location.href='http://localhost:3000/index.html';
}


if(document.location.pathname==='/elephant/catalog.html'&&document.location.search===""){
    
    document.location.href= document.location.origin+document.location.pathname+ '?cat=sloniham'

    // document.location.href='http://localhost:3000/index.html';
}
