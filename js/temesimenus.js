
/* ####################################################3#######  TEMES  ##############################################3################*/

const canviaTema = () => {
  var tema = localStorage.getItem('tema');
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

function inputError() {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input:required");
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

function ifScrollMostrarPujar() {
  const boto = document.getElementById('pujar');
  if (window.pageYOffset > 400) {
    boto.classList.remove("hidden");
  } else {
    boto.classList.add("hidden");
  }
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// #################################################################   FUNCIONS COMUNES DE DISPLAY D'INFORMACIO ##############################################

function popUp(mensaje) {
  const popup = document.getElementById('popup');
  if (!popup.classList.contains('visible')) {
    popup.textContent = mensaje;
    popup.className = 'visible';
    setTimeout(function () {
      popup.className = '';
    }, 2500);
  }

}

function decode(text) {
  
  var map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  };
  console.log(text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function(m) { return map[m]; }));
  
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function(m) { return map[m]; });
}