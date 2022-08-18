
window.onload = alCarregar;

function alCarregar() {
  canviaTema();

  afegeixListeners();

  afegirIdAMain();

  switch (nomArxiu()) { /*carga los eventos onload para la pagina correspondiente*/
    case "manuals.html":
      document.getElementById('paginamanuals').classList.add("active");
      getManuals();
      break;
    case "jocstaula.html":
      document.getElementById('paginajocs').classList.add("active");
      getJocsTaula();
      break;
    case "manualindividual.html":
      document.getElementById('paginamanuals').classList.add("active");
      obtenirManuals();
      break;
    case "jocindividual.html":
      document.getElementById('paginajocs').classList.add("active");
      obtenirJocs();
      break;
    case "lloguersjocs.html":
      obtenirLloguersJocs();
      break;
    case "lloguersmanuals.html":
      obtenirLloguersManuals();
      break;
    case "gestio.html":
      document.getElementById('paginagestio').classList.add("active");
      break;
    case "gestioingresosmembres.html":
      document.getElementById('paginagestio').classList.add("active");
      obtenirMembres();
      break;
    case "gestiolloguersjocs.html":
      document.getElementById('paginagestio').classList.add("active");
      obtenirJocs();
      break;
    case "gestiolloguersmanuals.html":
      document.getElementById('paginagestio').classList.add("active");
      obtenirManuals();
      break;
    case "membre.html":
      document.getElementById('paginacompte').classList.add("active");
      break;
    default:
      break;
  }
}

function afegeixListeners() {
  var botonsnavegacio = document.getElementsByClassName("nav-link");
  for (i = 0; i < botonsnavegacio.length; i++) {
    botonsnavegacio[i].addEventListener('mousedown', clickeffect);
    botonsnavegacio[i].addEventListener('mouseup', clickeffect);
  }

  document.getElementById("navbar-toggler").addEventListener('click', opennav);

  document.getElementById("temes").addEventListener('click', obrirTemes); /*TEMES*/
  document.querySelectorAll(".canvi-tema").forEach(element => {
    element.addEventListener('click', function () {
      estableixTema(this.id);
      canviaTema();
    });
  });

  document.querySelectorAll(".user-button").forEach(element => {
    element.addEventListener('click', function () { toggleuserpagecontent(this.id); });
  });
  if (nomArxiu() == "login.html") {
    document.getElementById("login").addEventListener('click', ferLogin); /*boton de login*/
    window.addEventListener("keydown", checkKeyPressed, false); /*al pulsar enter, mira que tecla es*/

    function checkKeyPressed(e) {
      if (e.keyCode == "13") { /*si es enter( cualquiera de los dos) haz login*/
        ferLogin();
      }
    }
  }
}

function nomArxiu() { /*da el nombre del archivo extrayendolo de la url*/
  var rutaAbsoluta = self.location.href;
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var posicionInterrogante = rutaAbsoluta.lastIndexOf("?");
  var rutaRelativa;
  if (posicionInterrogante == -1) {
    rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
  } else {
    rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, posicionInterrogante);
  }
  return rutaRelativa;
}

