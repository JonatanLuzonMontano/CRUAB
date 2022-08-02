
window.onload = addevents;

function addevents() {
    var navbuttons = document.getElementsByClassName("nav-link");
    for (i = 0; i < navbuttons.length; i++) {
        navbuttons[i].addEventListener('mousedown', clickeffect);
        navbuttons[i].addEventListener('mouseup', clickeffect);
    }
}

function clickeffect(e) {
    e.target.classList.toggle("clicked");
}