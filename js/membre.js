function actiuInactiu() {
  const nummembre = sessionStorage.getItem("numsoci");
  var xhttpactiu = new XMLHttpRequest();
  xhttpactiu.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttpactiu.responseText);
      //console.log(data);
      for (i = 0; i < data.length; i++) {
        if (data[i]["numsoci"] == nummembre) {
          document.getElementById('activitat').textContent = "Ets un usuari " + data[i]['estat'] + ".";
          break;
        }
      }
    }
  }
  xhttpactiu.open('GET', '/api/registre.php?tipus=actiusono', true);
  xhttpactiu.send();
}

function checkPeriodeaActivacio() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['activacio membres'] === 1) {
        document.getElementById('activarmembre').classList.remove('hidden');
        document.getElementById('activarmembre').addEventListener('click', function () { activar(); });
        document.getElementById('desactivarmembre').classList.remove('hidden');
        document.getElementById('desactivarmembre').addEventListener('click', function () { desactivar(); });
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php?opcio=passos', true);
  xhttpcheckeleccions.send();
}

function activar() {
  if (confirm("Estas segur?")) {
    var xhttpactivar = new XMLHttpRequest();
    xhttpactivar.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload;
      }
    }

    var data = {};

    data['estat'] = "actiu";

    xhttpactivar.open('PUT', '/api/eleccions.php', true);
    xhttpactivar.send();
  }
}

function desactivar() {
  if (confirm("Estas segur?, si canvies d'idea envia un correu a juntacruab@gmail.com")) {
    var xhttpactivar = new XMLHttpRequest();
    xhttpactivar.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload;
      }
    }

    var data = {};

    data['estat'] = "inactiu";

    xhttpactivar.open('PUT', '/api/eleccions.php', true);
    xhttpactivar.send();
  }
}