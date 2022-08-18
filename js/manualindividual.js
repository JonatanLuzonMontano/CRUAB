function eliminarCopiaManual(copia) {
  console.log(copia);
  var xhttpeliminarcopia = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search)
  var nom = params.get("nom");
  xhttpeliminarcopia.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpeliminarcopia.responseText);
      location.reload();
    }
  }
  xhttpeliminarcopia.open('DELETE', '/api/manualindividual.php?Nom=' + nom + '&NumCopia=' + copia, true);
  xhttpeliminarcopia.send();
}

function afegirCopiaManual() {

  var xhttpafegircopia = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search)
  var nom = params.get("nom");
  var data = { "nom": nom };
  xhttpafegircopia.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  }
  xhttpafegircopia.open('POST', '/api/manualindividual.php', true);
  xhttpafegircopia.send(JSON.stringify(data));
}

function reservarManual(manual, copia) {
  var xhttpreservar = new XMLHttpRequest();
  var data = { "usuari": sessionStorage.getItem("numsoci"), "manual": manual, "copia": copia };
  console.log(data);
  xhttpreservar.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpreservar.responseText);
      let resultat = JSON.parse(xhttpreservar.responseText);
      if (resultat.hasOwnProperty("Correcte")) {
        document.getElementById(copia).disabled = true;
        alert("Reserva sol·licitada");
        location.reload();
      } else {
        alert(resultat["Error"]);
        location.reload();
      }
    }
  }
  xhttpreservar.open('POST', '/api/lloguermanual.php', true);
  xhttpreservar.send(JSON.stringify(data));
}

function obtenirManuals() {
  var xhttpindividual = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search)
  var nommanual = params.get("nom");
  xhttpindividual.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpindividual.responseText);
      let llista = JSON.parse(xhttpindividual.responseText);
      console.log(llista);
      if (sessionStorage['numsoci'] != null) {
        var llistacopies = document.getElementById('llistacopies');
        const element = llistacopies.getElementsByClassName('manual-copia')[0];
        llista.forEach(function (manual) {
          const clonelement = element.cloneNode(true);
          clonelement.id = "clon-" + manual.Numcopia;
          document.getElementById('imageHolder').getElementsByTagName("img")[0].src = manual.Imatge;

          if (element.querySelector(".num-copia").textContent == "") {
            var copiaactual = element;
            let botoreserva = copiaactual.getElementsByClassName("boto-reserva")[0];
            copiaactual.querySelector(".num-copia").textContent = "Copia " + manual.Numcopia;
            botoreserva.id = manual.Numcopia;
            botoreserva.textContent = "Reserva";
            botoreserva.addEventListener('click', function () {reservarManual(nommanual, manual.Numcopia);});

            if (sessionStorage['juntari'] == "true") {
              let botonelimina = copiaactual.getElementsByClassName("boto-reserva")[1];
              botonelimina.textContent = "Elimina còpia";
              botonelimina.id = "-" + manual.Numcopia;

              botonelimina.addEventListener('click', function () {eliminarCopiaManual(manual.Numcopia);});

              if (manual.Retorn == null && manual.NumLloguer != null) {
                document.getElementById(-manual.Numcopia).disabled = true;
              }
              if (manual.Retorn == null && manual.NumLloguer != null) {
                document.getElementById(manual.Numcopia).disabled = true;
                document.getElementById(manual.Numcopia).innerHTML = "Reservat";
              }
            }
          } else {
            llistacopies.appendChild(clonelement);
            var copiaactual = llistacopies.querySelector(".manual-copia:last-child");
            let botoreserva = copiaactual.getElementsByClassName("boto-reserva")[0];
            copiaactual.querySelector(".num-copia").textContent = "Copia " + manual.Numcopia;
            botoreserva.id = manual.Numcopia;
            botoreserva.textContent = "Reserva";
            botoreserva.addEventListener('click', function () {reservarManual(nommanual, manual.Numcopia);});

            if (sessionStorage['juntari'] == "true") {
              let botonelimina = copiaactual.getElementsByClassName("boto-reserva")[1];
              botonelimina.textContent = "Elimina còpia";
              botonelimina.id = "-" + manual.Numcopia;
              botonelimina.addEventListener('click', function () {eliminarCopiaManual(manual.Numcopia);});

              if (manual.Retorn == null && manual.NumLloguer != null) {
                document.getElementById(-manual.Numcopia).disabled = true;
              }
              if (manual.Retorn == null && manual.NumLloguer != null) {
                document.getElementById(manual.Numcopia).disabled = true;
                document.getElementById(manual.Numcopia).innerHTML = "Reservat";
              }
            }

          }


        });
              

        if (sessionStorage['juntari'] == 'true') { /*añade el boton afegir copia*/
          document.getElementById('afegircopia').textContent = "Afegir Còpia";
          document.getElementById('afegircopia').classList.remove("hidden");
          document.getElementById('afegircopia').addEventListener('click', function () {afegirCopiaManual();});

        }

      } else {
        window.location.href = "login.html";
      }

    }
  }

  xhttpindividual.open('GET', '/api/manualindividual.php?nom=' + nommanual, true);
  xhttpindividual.send();
}