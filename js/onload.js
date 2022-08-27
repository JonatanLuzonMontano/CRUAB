
window.onload = alCarregar;

function alCarregar() {
  canviaTema();



  afegirClassAMain();

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

  afegeixListeners();
}

function afegeixListeners() {
  var botonsnavegacio = document.getElementsByClassName("nav-link");
  for (i = 0; i < botonsnavegacio.length; i++) {
    botonsnavegacio[i].addEventListener('mousedown', clickeffect);
    botonsnavegacio[i].addEventListener('mouseup', clickeffect);
  }
  ifSubmmit();
  ifFiltre();

  window.addEventListener('scroll', function () { ifScrollNavBg(); });

  document.getElementById("navbar-toggler").addEventListener('click', opennav);

  document.getElementById("temes").addEventListener('click', obrirTemes); /*TEMES*/
  document.querySelectorAll(".canvi-tema").forEach(element => {
    element.addEventListener('click', function () {
      estableixTema(this.id);
      canviaTema();
    });
  });

  /*
  document.querySelectorAll(".user-button").forEach(function (element) {
    element.addEventListener('click', function () { toggleuserpagecontent(this.id); });
  });
  */
  if (nomArxiu() == "login.html") {
    document.getElementById("login").addEventListener('click', ferLogin); /*boton de login*/
    document.getElementById("login").addEventListener('click', function () { inputError(); });
    window.addEventListener("keydown", checkKeyPressed, false); /*al pulsar enter, mira que tecla es*/

    function checkKeyPressed(e) {
      if (e.keyCode == "13") { /*si es enter( cualquiera de los dos) haz login*/
        ferLogin();
        inputError();
      }
    }
  }
  if (nomArxiu() == "registre.html") {
    document.getElementById("registre").addEventListener('click', function () { enviarDades() });
    document.getElementById("registre").addEventListener('click', function () { inputError(); });
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

function ifSubmmit() {
  if (document.querySelector('input[type="submit"]') != undefined) {
    document.querySelector('input[type="submit"]').addEventListener('click', function () { inputError(); });
  }
}

function ifFiltre() {
  if (document.getElementById("filtrar") != undefined) {
    document.getElementById('filtrar').addEventListener('click', function () { filtrar(); });
  }
}
