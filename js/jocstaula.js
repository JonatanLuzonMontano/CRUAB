function validarFormulariJoc(dades) {

  if (dades['nom'] == "") {
    document.forms["formafegirjoc"]["nom"].focus();
    document.getElementById('missatge').innerHTML = `<p>El nom és obligatori</p>`;
    return false
  }
  if (dades['minjugadors'] == "") {
    document.forms["formafegirjoc"]["minjugadors"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has de posar un mínim de jugadors</p>`;
    return false
  }
  if (dades['maxjugadors'] == "") {
    document.forms["formafegirjoc"]["maxjugadors"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has de posar un màxim de jugadors</p>`;
    return false
  }

  if (dades['maxjugadors'] < dades['minjugadors']) {
    document.forms["formafegirjoc"]["maxjugadors"].focus();
    document.forms["formafegirjoc"]["minjugadors"].focus();
    document.getElementById('missatge').innerHTML = `<p>El màxim de jugadors ha de ser igual o superior al mínim de jugadors</p>`;
    return false
  }

  if (dades['duracio'] == "") {
    document.forms["formafegirjoc"]["duracio"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'indicar la duració</p>`;
    return false
  }
  if (dades['dificultat'] == "") {
    document.forms["formafegirjoc"]["dificultat"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'indicar la difucultat del joc</p>`;
    return false
  }
  if (dades['editorial'] == "") {
    document.forms["formafegirjoc"]["editorial"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'indicar l'editorial</p>`;
    return false
  }

  return true;
}

function getRadioCheckedValue(radio_name) {
  var oRadio = document.forms[0].elements[radio_name];

  for (var i = 0; i < oRadio.length; i++) {
    if (oRadio[i].checked) {
      return oRadio[i].value;
    }
  }

  return '';
}

function afegirJoc() {

  var data = {};

  data['nom'] = document.getElementById("nom").value;
  data['minjugadors'] = document.getElementById("minjugadors").value;
  data['maxjugadors'] = document.getElementById("maxjugadors").value;
  data['duracio'] = document.getElementById("duracio").value;
  data['dificultat'] = document.getElementById("dificultat").value;
  data['editorial'] = document.getElementById("editorial").value;
  data['tipus'] = getRadioCheckedValue("tipus");

  if (validarFormulariJoc(data, imatge)) {
    var img = document.getElementById("img-uploader").files[0];
    imatge = new File([img], data["nom"] + ".jpg", { type: "image/jpeg" });

    var formData = new FormData();
    formData.append("imatge", imatge);
    formData.append("dades", data);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);
        if ((data.hasOwnProperty('Error'))) {
          document.getElementById('missatge').innerHTML = `<p>${data["Error"]}</p>`;
          if (data.hasOwnProperty('DeBug')) {
            document.getElementById('missatge').innerHTML += `<p>${data["DeBug"]}</p>`;
          }
        } else {
          window.location.href = "jocstaula.html";
        }
      }
    };

    xhttp.open('POST', '/api/JocsTaula.php', true);
    xhttp.send(JSON.stringify(data));
  }
}

function eliminarJoc(nom) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var data = JSON.parse(xhttp.responseText);
      if ((data.hasOwnProperty('Error'))) {
        alert(data["Error"] + " " + data["DeBug"]);
      } else {
        window.location.href = "jocstaula.html";
      }
    }
  }
  xhttp.open('DELETE', '/api/jocstaula.php?nom=' + nom, true);
  xhttp.send();
}

function registreJoc() {
  window.location.href = "afegirjoc.html";
}





function getJocsTaula() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttp.responseText);
      var llista = JSON.parse(xhttp.responseText);
      const element = document.querySelector(".joc:last-child");
      if (sessionStorage['juntari'] == 'true') {
        document.getElementById('boto-afegir').classList.remove('hidden');
        document.getElementById('boto-afegir').textContent = "Afegir Joc";
        document.getElementById('boto-afegir').addEventListener('click', function () { registreJoc(); });
      }
      llista.forEach(function (joc) {
        var clonelement = element.cloneNode(true);
        var llistajocs = document.getElementById('llistajocs');
        if (joc !== llista[0]) {
          llistajocs.appendChild(clonelement);
        }
        let jocactual = document.querySelector(".joc:last-child");
        jocactual.id = joc.Nom;
        jocactual.querySelector(".nom").textContent = joc.Nom;
        jocactual.querySelector("img").src = joc.Imatge;
        jocactual.querySelector("a").href = "jocindividual.html?nom=" + joc.Nom;
        jocactual.querySelector(".editorial").textContent = "Publicat per " + joc.Editorial + ".";
        jocactual.querySelector(".tipus").textContent = "Tipus " + joc.Tipus + ".";
        jocactual.querySelector(".duracio").textContent = "Duració promitja de " + joc.Duracio + " minuts.";
        jocactual.querySelector(".jugadors").textContent = "De " + joc.MinJugadors + " a " + joc.MaxJugadors + " persones.";

        let dificultat = jocactual.querySelector(".dificultat");
        switch (joc.Dificultat) {
          case 1:
            dificultat.textContent = "fàcil";
            dificultat.style = "background-color: green;";
            break;
          case 2:
            dificultat.textContent = "mitjà";
            dificultat.style = "background-color: rgb(223, 223, 6);";
            break;
          case 3:
            dificultat.textContent = "dificil";
            dificultat.style = "background-color: orange;";
            break;
          case 4:
            dificultat.textContent = "molt dificil";
            dificultat.style = "background-color: red;";
            break;
          default:
            break;
        }
        if (sessionStorage['juntari'] == 'true') {
          jocactual.querySelector(".eliminarboto").classList.remove('hidden');
          jocactual.querySelector(".eliminarboto").textContent = "Eliminar joc";
          jocactual.querySelector(".eliminarboto").addEventListener('click', function () { eliminarJoc(joc.Nom); });
        }
      });
    }
  };
  xhttp.open('GET', '/api/jocstaula.php', true);
  xhttp.send();
}

function filtrar() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttp.responseText);
      var llista = JSON.parse(xhttp.responseText);
      console.log(llista);
    }
  }

  /*const numbers = document.getElementById('numbers');
  const filtresActius = numbers.querySelectorAll('input:checked');
  var num = (function () {
    if (filtresActius.length == 1) {
      const a = filtresActius[0].value;
      return (a);
    }
  });
  var min = null;
  var max = null;*/

  const totsElements = document.querySelectorAll(".element");
  console.log(totsElements.type);

  /*for (i = 0; i < totsElements; i++) {
    let numjugadors = totsElements[i].querySelector('.jugadors').textContent;
    let nummaxim = numjugadors.replace(/^\D+/g, '');
    console.log(numjugadors, nummaxim);
    //if(element.querySelector('.jugadors').textContent){}
  }*/

}