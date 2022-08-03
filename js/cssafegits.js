
window.onload = addevents;

function addevents() {
    var navbuttons = document.getElementsByClassName("nav-link");
    for (i = 0; i < navbuttons.length; i++) {
        navbuttons[i].addEventListener('mousedown', clickeffect);
        navbuttons[i].addEventListener('mouseup', clickeffect);
    }

    document.getElementById("navbar-toggler").addEventListener('click', opennav);
    document.getElementById("theme-toggler").addEventListener('click', changetheme);
}

function clickeffect(e) {
    e.target.classList.toggle("clicked");
}


function opennav() {
    document.getElementById("navbuttons").classList.toggle("collapsed");
}

function changetheme() {
    document.body.classList.toggle("white-mode");
    document.body.classList.toggle("black-mode");
}
