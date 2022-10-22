
/* ####################################################3#######  TEMES  ##############################################3################*/

function canviaTema() {
  var tema = localStorage.getItem('tema');
  if (tema == null) {
    let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (matched) {
      console.log('dark');
      localStorage.setItem('tema', "fosc");
    } else {
      console.log('clar');
      localStorage.setItem('tema', "clar");
    }
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
  document.getElementById("botonsnavegacioprincipal").classList.toggle("collapsed");
  document.getElementById("boto-navegacio").classList.toggle("active");
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

function toast(mensaje) {
  const toast = document.getElementById('toast');
  if (!toast.classList.contains('visible')) {
    toast.textContent = mensaje;
    toast.className = 'visible';
    setTimeout(function () {
      toast.className = '';
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


  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function (m) { return map[m]; });
}

function carregant() {
  document.getElementsByTagName('main')[0].classList.add('hidden');
  document.getElementsByTagName('footer')[0].classList.add('hidden');
  document.querySelector('.loading-parent').classList.remove('hidden');

  setTimeout(() => {
    document.querySelector('.loading-parent').classList.add('hidden');
    document.getElementsByTagName('main')[0].classList.remove('hidden');
  }, 4996);
}
