
window.onload = alCarregar;

function alCarregar() {

  //carregant();

  canviaTema();

  checkEleccions();

  afegirClassAMain();

  ensenyarSocisActius();


  switch (nomArxiu()) { /*carga los eventos onload para la pagina correspondiente*/
    case "index.html":
      obtenirContingut();
      break;
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
      if (sessionStorage.eleccions == "false") {
        window.location.href = "index.html";
      } else {
        pasEleccions();
      }
      break;
    case "":
      window.location.href = "index.html";
      break;
    default:

      break;
  }

  afegeixListeners();
  console.table(sessionStorage);
}

function afegeixListeners() {
  var botonsnavegacioprincipal = document.getElementsByClassName("enllaç-navegacio");
  for (i = 0; i < botonsnavegacioprincipal.length; i++) {
    botonsnavegacioprincipal[i].addEventListener('mousedown', clickeffect);
    botonsnavegacioprincipal[i].addEventListener('mouseup', clickeffect);
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
    const filters = document.querySelectorAll('#filterbox select');
    filters.forEach((e) => { e.addEventListener('change', function () { filtrar(); }); });
  }
}

function checkEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.table(llista);
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

function ensenyarSocisActius() {
  var socisactius = [];
  const nummembre = sessionStorage.getItem("numsoci");
  var xhttpactiu = new XMLHttpRequest();
  xhttpactiu.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttpactiu.responseText);
      for (i = 0; i < data.length; i++) {
        if (data[i]["numsoci"] == nummembre) {
          sessionStorage.setItem("estatsoci", data[i]['estat']);
        }
        if (data[i]['estat'] == 'actiu') {
          socisactius.push(data[i]['estat']);
        }
      }
    }
  }
  xhttpactiu.open('GET', '/api/registre.php?tipus=actiusono', true);
  xhttpactiu.send();



  setTimeout(() => {
    if (sessionStorage['estatsoci'] == "actiu") {
      document.querySelector('.socis').classList.remove('hidden');
      document.getElementById('socisactius').textContent = socisactius.length;
    }
  }, 100);
}

