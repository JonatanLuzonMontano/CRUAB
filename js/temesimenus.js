
/* ####################################################3#######  TEMES  ##############################################3################*/
var tema = localStorage.getItem('tema');

const canviaTema = () => {
  tema = localStorage.getItem('tema');
  if (tema == null) {
    localStorage.setItem('tema', "clar");
  }
  document.body.classList = tema;
}

function estableixTema(temaactual) {
  localStorage.setItem('tema', temaactual);
}

function afegirClassAMain() {
  var nomarxiu = nomArxiu();
  nomarxiu = nomarxiu.slice(0, -5);
  document.querySelector(".main-content").classList += " " + nomarxiu;
}

/*############################################################   MENUS   ##############################################################*/

function clickeffect(e) { /*efecte de clic als botons*/
  e.target.classList.toggle("clicked");
}

function opennav() { /* obre i tanca la navegació en mòbil*/
  document.getElementById("botonsnavegacio").classList.toggle("collapsed");
}

function obrirTemes() {
  document.getElementById("espaitemes").classList.toggle('open');
}

/*
function toggleuserpagecontent(id) {  a la pagina d'usuari, canvia entre menus 
  console.log(id);
  document.querySelectorAll(".user-content-article").forEach(element => {
    element.classList.remove("open");
  });
  document.getElementsByClassName(id)[0].classList.toggle("open");
  document.querySelectorAll(".user-button").forEach(element => {
      element.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}
*/

function inputError() {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const labels = form.querySelectorAll("label");

  inputs.forEach(function (element, index) {
    if (element.validity.valid == false || element.value == "") {
      element.classList.add('error');
      setTimeout(() => { element.classList.remove('error'); }, 501);
      labels[index].classList.add('error');
    }
  });
}

function ifScrollNavBg() {
  const nav = document.getElementById('capçalera');
  if (window.pageYOffset < 20) {
    nav.classList.remove("opac");
  } else {
    nav.classList.add("opac");
  }
}