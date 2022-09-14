
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
    case "gestiomembres.html":
      document.getElementById('paginagestio').classList.add("active");
      getMembres();
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
      checkPeriodeaActivacio();
      actiuInactiu();
      break;
    case "eleccions.html":
      //console.log("Session storage = " + sessionStorage.eleccions);
      if (sessionStorage.eleccions == "false") {
        window.location.href = "index.html";
      } else {
        pasEleccions();
      }
      break;
    default:
      break;
  }

  afegeixListeners();
}

function afegeixListeners() {
  var botonsnavegacio = document.getElementsByClassName("enllaç-navegació");
  for (i = 0; i < botonsnavegacio.length; i++) {
    botonsnavegacio[i].addEventListener('mousedown', clickeffect);
    botonsnavegacio[i].addEventListener('mouseup', clickeffect);
  }
  ifSubmmit();
  ifFiltre();

  window.addEventListener('scroll', function () {
    ifScrollNavBg();
    ifScrollMostrarPujar();
  });

  document.getElementById("pujar").addEventListener('click', function () { scrollTop(); });

  document.getElementById("boto-navegacio").addEventListener('click', opennav);

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
      document.getElementById('obrireleccions').addEventListener('click', function () { obrirEleccions(); });
      document.getElementById('obrirllistes').addEventListener('click', function () { obrirLlistes(); });
      document.getElementById('obrirvotacio').addEventListener('click', function () { obrirVotacio(); });
      document.getElementById('obriractivacio').addEventListener('click', function () { obrirActivacio(); });
      document.getElementById('tancareleccions').addEventListener('click', function () { tancarEleccions(); });
      document.getElementById('tancarllistes').addEventListener('click', function () { tancarLlistes(); });
      document.getElementById('tancarvotacio').addEventListener('click', function () { tancarVotacio(); });
      document.getElementById('tancaractivacio').addEventListener('click', function () { tancarActivacio(); });
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
  if (document.getElementById("filterbox") != undefined) {
    const checkboxesminuts = document.querySelectorAll('#minuts input[type="checkbox"]');
    checkboxesminuts.forEach((e) => { e.addEventListener('click', function () { onlyOneMinuts(this); }); });

    const checkboxesjugadors = document.querySelectorAll('#jugadors input[type="checkbox"]');
    checkboxesjugadors.forEach((e) => { e.addEventListener('click', function () { onlyOneJugadors(this); }); });

    const checkboxes = document.querySelectorAll('#filterbox input[type="checkbox"]');
    checkboxes.forEach((e) => { e.addEventListener('click', function () { filtrar(); }); });


  }
}

function checkEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      //console.log(llista);
      if (llista['proces electoral'] === 1 && sessionStorage['numsoci'] != null) {
        document.getElementById('paginaeleccions').classList.remove('hidden');
        window.sessionStorage.setItem('eleccions', true);
      } else {
        window.sessionStorage.setItem('eleccions', false);
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php?opcio=eleccio', true);
  xhttpcheckeleccions.send();
}

