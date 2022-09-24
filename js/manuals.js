function validarFormulariManual(dades, imatge) {

  if (dades['nom'] == "") {
    document.forms["formafegirmanual"]["nom"].focus();
    popUp("El nom és obligatori");
    return false;
  }
  if (dades['genere'] == "") {
    document.forms["formafegirmanual"]["genere"].focus();
    popUp("Has de posar el génere");
    return false;
  }
  if (dades['ambientacio'] == "") {
    document.forms["formafegirmanual"]["ambientacio"].focus();
    popUp("Has de posar una ambientació");
    return false;
  }
  if (dades['editorial'] == "") {
    document.forms["formafegirmanual"]["editorial"].focus();
    popUp("Has d'indicar l'editorial");
    return false;
  }
  if (dades['adquirit'] == "") {
    document.forms["formafegirmanual"]["adquirit"].focus();
    popUp("Has d'indicar quan es va adquirir el manual");
    return false;
  } else {
    var data = Date.parse(new Date());
    var datanadquisicio = Date.parse(dades['adquirit']);
    if (data < datanadquisicio) {
      document.forms["formregistre"]["naixement"].focus();
      popUp("La data d'adquisició ha de ser anterior a la data actual");
      return false;
    }
  }
  if (imatge == null) {
    document.forms["formafegirmanual"]["img-uploader"].focus();
    popUp("Has d'introduir una imatge");
    return false;
  }

  return true;
}
/*
function afegirManual() {

  var data = {};

  data['nom'] = document.getElementById("nom").value;
  data['genere'] = document.getElementById("genere").value;
  data['ambientacio'] = document.getElementById("ambientacio").value;
  data['editorial'] = document.getElementById("editorial").value;
  data['adquirit'] = document.getElementById("adquirit").value;
  data['coleccio'] = document.getElementById("coleccio").value;
  data['id'] = ...;

  if (validarFormulariManual(data, imatge)) {

    var img = document.getElementById("img-uploader").files[0];
    imatge = new File([img], data["nom"] + ".jpg", { type: "image/jpeg" });

    var formData = new FormData();
    formData.append("imatge", imatge);
    formData.append("dades", data);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        if ((data.hasOwnProperty('Error'))) {
          document.getElementById('missatge').innerHTML = `<p>${data["Error"]}</p>`;
          if (data.hasOwnProperty('DeBug')) {
            document.getElementById('missatge').innerHTML += `<p>${data["DeBug"]}</p>`;
          }
        } else {
          window.location.href = "manuals.html";
        }
      }
    };

    xhttp.open('POST', '/api/manuals.php', true);
    xhttp.setRequestHeader("Content-Type", "multipart/form-data");
    xhttp.send(formData);

  }
}*/

function eliminarManual(nom) {
  if (confirm("Estas segur?")) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        if ((data.hasOwnProperty('Error'))) {
          alert(data["Error"] + " " + data["DeBug"]);
        } else {
          window.location.href = "manuals.html";
        }
      }
    }
    xhttp.open('DELETE', '/api/manuals.php?nom=' + nom, true);
    xhttp.send();
  }
}

function registreManual() {
  window.location.href = "afegirmanual.html";
}

function getManuals() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttp.responseText);
      var llista = JSON.parse(xhttp.responseText);
      console.table(llista);
      const element = document.getElementsByClassName("manual")[0];
      if (sessionStorage['juntari'] == 'true') {
        document.getElementById("boto-afegir").addEventListener('click', function () { registreManual(); }); /* esto no tendria que estar aqui, sino fuera del foreach*/
        document.getElementById("boto-afegir").textContent = "Afegir manual";
        document.getElementById("boto-afegir").classList.remove("hidden");
      }
      llista.forEach(function (manual) {
        const clonelement = element.cloneNode(true);
        var llistamanuals = document.getElementById("llistamanuals");
        if (manual !== llista[0]) {
          llistamanuals.appendChild(clonelement);
        }
        var manualactual = document.querySelector(".manual:last-child");
        manualactual.id = manual.Nom;
        manualactual.getElementsByClassName("nom")[0].textContent = manual.Nom;
        manualactual.querySelector("a").href = "manualindividual.html?nom=" + manual.Nom;
        manualactual.querySelector("img").src = manual.Imatge;
        manualactual.querySelector(".editorial").textContent = "Publicat per " + manual.Editorial + ".";
        manualactual.querySelector(".ambientacio").textContent = "Ambientació: " + manual.Ambientacio + ".";
        manualactual.querySelector(".coleccio").textContent = "Part de la col·leció " + manual.Coleccio + ".";
        manualactual.querySelector(".adquirit").textContent = "A la taquilla des del " + manual.Adquirit + ".";

        if (sessionStorage['juntari'] == 'true') {
          manualactual.getElementsByClassName("eliminarboto")[0].textContent = "Eliminar manual";
          manualactual.getElementsByClassName("eliminarboto")[0].classList.remove("hidden");
          manualactual.getElementsByClassName("eliminarboto")[0].addEventListener('click', function () { eliminarManual(manual.Nom); });
        }
      });
    }
  };
  xhttp.open('GET', '/api/manuals.php', true);
  xhttp.send();
}