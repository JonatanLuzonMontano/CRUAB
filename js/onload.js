
window.onload = alCarregar;

function alCarregar() {
  canviaTema();

  checkEleccions();

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
    case "eleccions.html":
      pasEleccions();
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
  switch (nomArxiu()) {
    case "login.html":
      document.getElementById("login").addEventListener('click', function () { ferLogin(); }); /*boton de login*/
      document.getElementById("login").addEventListener('click', function () { inputError(); });
      window.addEventListener("keydown", checkKeyPressed, false); /*al pulsar enter, mira que tecla es*/

      function checkKeyPressed(e) {
        if (e.keyCode == "13") { /*si es enter( cualquiera de los dos) haz login*/
          ferLogin();
          inputError();
        }
      }
      break;
    case "registre.html":
      document.getElementById("registre").addEventListener('click', function () { enviarDades(); });
      document.getElementById("registre").addEventListener('click', function () { inputError(); });
      break;
    case "gestio.html":
      if (sessionStorage.presentaciollistes === "true") {
        document.getElementById('obrireleccions').disabled = true;
      } else {
        document.getElementById('obrireleccions').addEventListener('click', function () { obrirLlistes(); });
      }
      if (sessionStorage.votacio === "true") {
        document.getElementById('obrirvotacio').disabled = true;
      } else {
        document.getElementById('obrirvotacio').addEventListener('click', function () { obrirVotacio(); });
      }

      break;
    default:
      break;
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

function checkEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['proces electoral'] === 1) {
        document.getElementById('paginaeleccions').classList.remove('hidden');
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php', true);
  xhttpcheckeleccions.send();
}

