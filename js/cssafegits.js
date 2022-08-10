
window.onload = addevents;

function addevents() {
    var navbuttons = document.getElementsByClassName("nav-link");
    for (i = 0; i < navbuttons.length; i++) {
        navbuttons[i].addEventListener('mousedown', clickeffect);
        navbuttons[i].addEventListener('mouseup', clickeffect);
    }

    document.getElementById("navbar-toggler").addEventListener('click', opennav);
    document.getElementById("theme-toggler").addEventListener('click', changetheme);

    
    switch(filename()){
        case "manuals.html":
            getManuals();
            break;
        case "jocstaula.html":
            getJocsTaula();
            break;
        case "manualsindividuals.html":
            obtenirManuals();
            break;
        case "jocindividual.html":
            obtenirJocs();
            break;
        case "lloguersjocs.html":
            obtenirLloguersJocs();
            break;
        case "lloguersmanuals.html":
            obtenirLloguersManuals();
            break;
        case "gestioingresosmembres.html":
            obtenirMembres();
            break;
        case "gestiolloguersjocs.html":
            obtenirJocs();
            break;
        case "gestiolloguersmanuals.html":
            obtenirManuals();
            break;
        default:
            break;
    }

}

function filename(){
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var posicionInterrogante = rutaAbsoluta.lastIndexOf("?");
    var rutaRelativa;
    if(posicionInterrogante == -1){
        rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    } else {
        rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , posicionInterrogante );
    }
    return rutaRelativa;
}

function clickeffect(e) {
    e.target.classList.toggle("clicked");
}


function opennav() {
    document.getElementById("navbuttons").classList.toggle("collapsed");
}

function changetheme() {
    document.body.classList.toggle("black-mode");
}
