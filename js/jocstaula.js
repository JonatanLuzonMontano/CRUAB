function validarFormulariJoc(dades) {

  if (dades['nom'] == "") {
    document.forms["formafegirjoc"]["nom"].focus();
    toast('El nom és obligatori');
    return false;
  }
  if (dades['minjugadors'] == "") {
    document.forms["formafegirjoc"]["minjugadors"].focus();
    toast('Has de posar un mínim de jugadors');
    return false;
  }
  if (dades['maxjugadors'] == "") {
    document.forms["formafegirjoc"]["maxjugadors"].focus();
    toast('Has de posar un màxim de jugadors');
    return false;
  }

  if (dades['maxjugadors'] < dades['minjugadors']) {
    document.forms["formafegirjoc"]["maxjugadors"].focus();
    toast('El màxim de jugadors ha de ser igual o superior al mínim de jugadors');
    return false;
  }

  if (dades['duracio'] == "") {
    document.forms["formafegirjoc"]["duracio"].focus();
    toast("Has d'indicar la duració");
    return false;
  }
  if (dades['dificultat'] == "") {
    document.forms["formafegirjoc"]["dificultat"].focus();
    toast("Has d'indicar la dificultat del joc");
    return false;
  }
  if (dades['editorial'] == "") {
    document.forms["formafegirjoc"]["editorial"].focus();
    toast("Has d'indicar l'editorial");
    return false;
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
/*
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
}*/

function eliminarJoc(nom) {
  if (confirm("Estas segur?")) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);
        if ((data.hasOwnProperty('Error'))) {
          console.log(data["Error"] + ", " + data["DeBug"]);
        } else {
          window.location.href = "jocstaula.html";
        }
      }
    }
    xhttp.open('DELETE', '/api/jocstaula.php?nom=' + nom, true);
    xhttp.send();
  }
}

function registreJoc() {
  window.location.href = "afegirjoc.html";
}

function getJocsTaula() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var llista = JSON.parse(xhttp.responseText);
      console.table(llista);
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
        jocactual.setAttribute("minjugadors", joc.MinJugadors);
        jocactual.setAttribute("maxjugadors", joc.MaxJugadors);
        jocactual.setAttribute("minuts", joc.Duracio);

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
            alert("error, dificultad invalida");
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
/*
function onlyOneMinuts(checkbox) {
  var checkboxes = document.querySelectorAll('#minuts input[type="checkbox"]');
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}

function onlyOneJugadors(checkbox) {
  var checkboxes = document.querySelectorAll('#jugadors input[type="checkbox"]');
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}
*/

function filtrar() {
  const jugadors = document.querySelector('#jugadors').value;
  const minuts = document.querySelector('#minuts').value;
  const jocs = document.getElementsByClassName('element');
  console.log("jugadors = " + jugadors + " minuts: " + minuts);
  for (i = 0; i < jocs.length; i++) {
    jocs[i].classList.remove('hidden');
  }
  if (jugadors != "" || minuts != "") {
    if (jugadors != "" && minuts === "") {
      filtrarJugadors();
    }
    if (minuts != "" && jugadors === "") {
      filtrarMinuts();
    }
    if (jugadors != "" && minuts != "") {
      filtrarJugadorsIMinuts();
    }
  }
}

function filtrarJugadors() {
  const jocs = document.getElementsByClassName('element');
  const numjugadors = document.querySelector("#jugadors").value;
  var atleastone = false;
  for (i = 0; i < jocs.length; i++) {

    const element = jocs[i];
    if (numjugadors === "10+") {
      if (element.getAttribute("minjugadors") <= 10) {
        element.classList.add('hidden');
      }
    } else {
      if (numjugadors < element.getAttribute("minjugadors") || numjugadors > element.getAttribute("maxjugadors")) {
        element.classList.add('hidden');
      }
    }
  }
  for (i = 0; i < jocs.length; i++) {
    if (!jocs[i].classList.contains('hidden')) {
      atleastone = true;
      break;
    }
  }
  if (atleastone == false) {
    toast("No hi ha cap joc per " + numjugadors + " jugadors.");
  }
}

function filtrarMinuts() {
  const jocs = document.getElementsByClassName('element');
  var minutsfiltre = document.querySelector("#minuts").value;
  var atleastone = false;
  let minutsfiltrereal = [];
  switch (minutsfiltre) {
    case document.querySelectorAll('#minuts option')[1].value:
      minutsfiltrereal.push(parseInt(minutsfiltre.substring(1)));
      for (i = 0; i < jocs.length; i++) {
        const minuts = parseInt(jocs[i].getAttribute("minuts"));
        if (minuts >= minutsfiltrereal) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
    case document.querySelector('#minuts option:last-child').value:
      console.log(minutsfiltre);
      minutsfiltrereal.push(minutsfiltre.slice(0, -1));
      
      for (i = 0; i < jocs.length; i++) {
        const minuts = parseInt(jocs[i].getAttribute("minuts"));
        if (minuts <= minutsfiltrereal) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
    default:
      const index = minutsfiltre.indexOf("-");
      minutsfiltrereal.push(minutsfiltre.substring(0, index));
      minutsfiltrereal.push(minutsfiltre.substring(index + 1));

      const totsminuts = [];
      for (i = parseInt(minutsfiltrereal[0]); i <= parseInt(minutsfiltrereal[1]); i++) {
        totsminuts.push(i);
      }
      
      for (i = 0; i < jocs.length; i++) {
        if (!totsminuts.includes(parseInt(jocs[i].getAttribute("minuts")))) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
  }
  for (i = 0; i < jocs.length; i++) {
    if (!jocs[i].classList.contains('hidden')) {
      atleastone = true;
      break;
    }
  }
  if (atleastone == false) {
    toast("No hi ha cap joc de " + minutsfiltre + " minuts.");
  }

}

function filtrarJugadorsIMinuts() {
  const jocs = document.getElementsByClassName('element');
  const minutsfiltre = document.querySelector("#minuts").value;
  const numjugadors = document.querySelector("#jugadors").value;
  var atleastone = false;
  const minutsfiltrereal = [];
  switch (minutsfiltre) {
    case document.querySelectorAll('#minuts option')[1].value:
      minutsfiltrereal.push(parseInt(minutsfiltre.substring(1)));
      for (i = 0; i < jocs.length; i++) {
        const minuts = parseInt(jocs[i].getAttribute("minuts"));
        if (minuts >= minutsfiltrereal) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
    case document.querySelector('#minuts option:last-child').value:
      console.log(minutsfiltre);
      minutsfiltrereal.push(minutsfiltre.slice(0, -1));
      console.log(minutsfiltrereal);
      for (i = 0; i < jocs.length; i++) {
        const minuts = parseInt(jocs[i].getAttribute("minuts"));
        if (minuts <= minutsfiltrereal) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
    default:
      const index = minutsfiltre.indexOf("-");
      minutsfiltrereal.push(minutsfiltre.substring(0, index));
      minutsfiltrereal.push(minutsfiltre.substring(index + 1));

      const totsminuts = [];
      for (i = parseInt(minutsfiltrereal[0]); i <= parseInt(minutsfiltrereal[1]); i++) {
        totsminuts.push(i);
      }
      for (i = 0; i < jocs.length; i++) {
        if (!totsminuts.includes(parseInt(jocs[i].getAttribute("minuts")))) {
          jocs[i].classList.add('hidden');
        }
      }
      break;
  }
  for (i = 0; i < jocs.length; i++) {
    const element = jocs[i];
    if (numjugadors === "10+") {
      if (element.getAttribute("minjugadors") < 10) {
        element.classList.add('hidden');
      }
    } else {
      if (numjugadors < element.getAttribute("minjugadors") || numjugadors > element.getAttribute("maxjugadors")) {
        element.classList.add('hidden');
      }
    }
  }

  for (i = 0; i < jocs.length; i++) {
    if (!jocs[i].classList.contains('hidden')) {
      atleastone = true;
      break;
    }
  }
  if (atleastone == false) {
    if (numjugadors > 1) {
      toast("No hi ha cap joc de " + minutsfiltre + " minuts i " + numjugadors + " jugadors.");
    } else {
      toast("No hi ha cap joc de " + minutsfiltre + " minuts i " + numjugadors + " jugador.");
    }
  }
}