function validarFormulariManual(dades, imatge) {

  if (dades['nom'] == "") {
    document.forms["formafegirmanual"]["nom"].focus();
    document.getElementById('missatge').innerHTML = `<p>El nom és obligatori</p>`;
    return false
  }
  if (dades['genere'] == "") {
    document.forms["formafegirmanual"]["genere"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has de posar el génere</p>`;
    return false
  }
  if (dades['ambientacio'] == "") {
    document.forms["formafegirmanual"]["ambientacio"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has de posar una ambientació</p>`;
    return false
  }
  if (dades['editorial'] == "") {
    document.forms["formafegirmanual"]["editorial"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'indicar l'editorial</p>`;
    return false
  }
  if (dades['adquirit'] == "") {
    document.forms["formafegirmanual"]["adquirit"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'indicar quan es va adquirir el manual</p>`;
    return false
  } else {
    var data = Date.parse(new Date());
    var datanadquisicio = Date.parse(dades['adquirit']);
    if (data < datanadquisicio) {
      document.forms["formregistre"]["naixement"].focus();
      document.getElementById('missatge').innerHTML = `<p>La data d'adquisició ha de ser anterior a la data actual</p>`;
      return false
    }
  }

  if (imatge == null) {
    document.forms["formafegirmanual"]["img-uploader"].focus();
    document.getElementById('missatge').innerHTML = `<p>Has d'introduir una imatge</p>`;
    return false
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

function registreManual() {
  window.location.href = "afegirmanual.html";
}

function getManuals() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var llista = JSON.parse(xhttp.responseText);
      console.log(llista);
      console.log(sessionStorage);
      if (sessionStorage['numsoci'] != null) {

        llista.forEach(function (manual) {
          var llistamanuals = document.getElementById("llistamanuals");
          const element = document.getElementsByClassName("manual")[0];
          const clonelement = element.cloneNode(true);

          if (element.querySelector(".nom").textContent == "") {
            var copiaactual = element;
            copiaactual.id = manual.Nom;
            copiaactual.getElementsByClassName("nom")[0].textContent = manual.Nom;
            copiaactual.querySelector("a").href = "manualindividual.html?nom=" + manual.Nom;
            copiaactual.querySelector("img").src = manual.Imatge;
            copiaactual.querySelector(".detalls").textContent = "Ambientació: " + manual.Ambientacio;

            if (sessionStorage['juntari'] == 'true') {
              document.getElementById("boto-afegir").addEventListener('click', function() {registreManual();}); /* esto no tendria que estar aqui, sino fuera del foreach*/
              document.getElementById("boto-afegir").textContent = "Afegir manual";
              document.getElementById("boto-afegir").classList.remove("hidden");
              copiaactual.getElementsByClassName("eliminarboto")[0].textContent = "Eliminar manual";
              copiaactual.getElementsByClassName("eliminarboto")[0].classList.remove("hidden");
              copiaactual.getElementsByClassName("eliminarboto")[0].addEventListener('click', function () { eliminarManual(manual.Nom); });
            }

          } else {
            llistamanuals.appendChild(clonelement);
            var copiaactual = document.querySelector(".manual:last-child");
            copiaactual.id = manual.Nom;
            copiaactual.getElementsByClassName("nom")[0].textContent = manual.Nom;
            copiaactual.querySelector("a").href = "manualindividual.html?nom=" + manual.Nom;
            copiaactual.querySelector("img").src = manual.Imatge;
            copiaactual.querySelector(".detalls").textContent = "Ambientació: " + manual.Ambientacio;

            if (sessionStorage['juntari'] == 'true') {
              copiaactual.getElementsByClassName("eliminarboto")[0].textContent = "Eliminar manual";
              copiaactual.getElementsByClassName("eliminarboto")[0].classList.remove("hidden");
              copiaactual.getElementsByClassName("eliminarboto")[0].addEventListener('click', function () { eliminarManual(manual.Nom); });
            }
          }
        });
      } else {
        document.querySelector("main article").innerHTML += '<h3 style="position:absolute; bottom:0px; left:0px; transform:translate(35vw, -50vh);">Inicia sessió per poder veure els manuals</h3>';
      }
    }
  };
  xhttp.open('GET', '/api/manuals.php', true);
  xhttp.send();
}