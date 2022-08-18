
/* #################  TEMES  ########################*/
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

function afegirIdAMain() {
  var nomarxiu = nomArxiu();
  nomarxiu = nomarxiu.slice(0,-5);
  document.querySelector(".main-content").id = nomarxiu;
}

/*##################   MENUS  ######################*/

function clickeffect(e) { /*efecte de clic als botons*/
  e.target.classList.toggle("clicked");
}

function opennav() { /* obre i tanca la navegació en mòbil*/
  document.getElementById("navbuttons").classList.toggle("collapsed");
}

function obrirTemes() {
  document.getElementById("espaitemes").classList.toggle('open');
}

function toggleuserpagecontent(id) { /* a la pagina d'usuari, canvia entre menus */
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





