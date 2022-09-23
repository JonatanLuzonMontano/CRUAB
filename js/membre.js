function actiuInactiu() {
  const nummembre = sessionStorage.getItem("numsoci");
  var xhttpactiu = new XMLHttpRequest();
  xhttpactiu.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttpactiu.responseText);
      for (i = 0; i < data.length; i++) {
        if (data[i]["numsoci"] == nummembre) {
          const missatge = "Ets un usuari " + data[i]['estat'] + ".";
          sessionStorage.setItem("estatsoci", data[i]['estat']);
          document.getElementById('activitat').textContent = missatge;
          popUp(missatge);
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
      //console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.table(llista);
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
  const membre = sessionStorage['numsoci'];
  if (confirm("Estas segur?")) {
    var xhttpactivar = new XMLHttpRequest();
    xhttpactivar.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    }

    var data = {};

    data['opcio'] = "activar";
    data['membre'] = membre;

    xhttpactivar.open('PUT', '/api/registre.php', true);
    xhttpactivar.send(JSON.stringify(data));
  }
}

function desactivar() {
  const membre = sessionStorage['numsoci'];
  if (confirm("Estas segur?, si canvies d'idea envia un correu a juntacruab@gmail.com")) {
    var xhttpdesactivar = new XMLHttpRequest();
    xhttpdesactivar.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    }

    var data = {};

    data['opcio'] = "desactivar";
    data['membre'] = membre;

    xhttpdesactivar.open('PUT', '/api/registre.php', true);
    xhttpdesactivar.send(JSON.stringify(data));
  }
}

function getMembres() {
  var xhttpmembres = new XMLHttpRequest();
  xhttpmembres.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttpmembres.responseText);
      var membres = JSON.parse(xhttpmembres.responseText);
      console.table(membres);

      var t = document.querySelector('#membres');
      var td = t.content.querySelectorAll("td");

      for (let i = 0; i < membres.length; i++) {
        const membre = membres[i];
        var tb = null;
        if (membre['estat'] === 'actiu') {
          tb = document.querySelector("#actius tbody");
        } else {
          tb = document.querySelector("#inactius tbody");
        }

        for (const [key, value] of Object.entries(membre)) {
          if (key == "pseudonim" && value == "" || key == "pseudonim" && value == " ") {
            for (let j = 0; j < td.length; j++) {
              const tdactual = td[j];
              if (tdactual.classList.contains(key)) {
                tdactual.textContent = "-";
              }
            }
          } else {
            for (let j = 0; j < td.length; j++) {
              const tdactual = td[j];
              if (tdactual.classList.contains(key)) {
                tdactual.textContent = value;
              }
            }
          }
        }

        for (let j = 0; j < td.length; j++) {
          const tdactual = td[j];
          if (tdactual.classList.contains("boto")) {
            tdactual.id = membres[i]['numsoci'];
          }
        }

        // Clonar la nueva fila e insertarla en la tabla
        var clone = document.importNode(t.content, true);
        tb.appendChild(clone);
        document.getElementById(membres[i]['numsoci']).addEventListener("click", function () {
          eliminarMembre(membres[i]["numsoci"], membres[i]);
        });
      }
    }

  }
  xhttpmembres.open('GET', '/api/registre.php?tipus=tots', true);
  xhttpmembres.send();

}


/*para arreglar, no se puede eliminar nadie que aparezca en la lista de llistes*/
function eliminarMembre(numsoci) {
  if (confirm('estas segur que vols eliminar el soci de numero ' + numsoci + "?")) {
    var data = { numsoci: numsoci };
    console.log(data);
    var xhttpmembreeliminat = new XMLHttpRequest();
    xhttpmembreeliminat.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttpmembreeliminat.responseText);
        var data = JSON.parse(xhttpmembreeliminat.responseText);
        if ((data.hasOwnProperty('Error'))) {
          console.log(data["Error"]);
          if (data.hasOwnProperty('DeBug')) {
            console.log(data["DeBug"]);
          }
        } else {
          location.reload();
        }
      }
    }
    xhttpmembreeliminat.open('DELETE', '/api/registre.php', true);
    xhttpmembreeliminat.send(JSON.stringify(data));
  }
}
