
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
  document.body.classList.toggle("black-mode");
}

function toggleuserpagecontent(id) {
  console.log(id);
  document.querySelectorAll(".user-content-article").forEach(element => {
    if (element.classList.contains("open")) {
      element.classList.remove("open");
    }
  });
  document.getElementsByClassName(id)[0].classList.toggle("open");
  document.querySelectorAll(".user-button").forEach(element => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  document.getElementById(id).classList.toggle("active");
  
}