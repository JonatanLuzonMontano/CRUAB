function eliminarCopiaManual(copia) {
  if (confirm("Estas segur?")) {
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
    xhttpeliminarcopia.open('DELETE', '/api/manualsindividuals.php?Nom=' + nom + '&NumCopia=' + copia, true);
    xhttpeliminarcopia.send();
  }
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
  xhttpafegircopia.open('POST', '/api/manualsindividuals.php', true);
  xhttpafegircopia.send(JSON.stringify(data));
}

function reservarManual(manual, copia) {
  var xhttpreservar = new XMLHttpRequest();
  var data = { "usuari": sessionStorage.getItem("numsoci"), "manual": manual, "copia": copia };
  console.table(data);
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
        const element = llistacopies.getElementsByClassName('element-copia')[0];
        document.querySelector('article h1').textContent = nommanual;
        console.log(llista[0]);
        if (llista[0] == null) {
          afegirCopiaManual();
        }
        llista.forEach(function (manual) {
          const clonelement = element.cloneNode(true);
          if (manual != llista[0]) {
            llistacopies.appendChild(clonelement);
          }
          var copiaactual = llistacopies.querySelector(".element-copia:last-child");
          document.getElementById('imageHolder').querySelector("img").src = manual.Imatge;
          copiaactual.id = "copia" + manual.Numcopia;
          copiaactual.querySelector(".num-copia").textContent = "Copia " + manual.Numcopia;
          let botoreserva = copiaactual.querySelector(".boto-reserva");
          botoreserva.id = manual.Numcopia;
          botoreserva.textContent = "Reserva";
          botoreserva.disabled = false;
          botoreserva.addEventListener('click', function () { reservarManual(nommanual, manual.Numcopia); });

          if (manual.Retorn == null && manual.NumLloguer != null) {
            botoreserva.disabled = true;
            botoreserva.textContent = "Reservada";
          }

          if (sessionStorage['juntari'] == "true") {
            let botoelimina = copiaactual.querySelector(".boto-elimina");
            botoelimina.textContent = "Elimina còpia";
            botoelimina.disabled = false;
            botoelimina.classList.remove('hidden');
            botoelimina.id = "-" + manual.Numcopia;
            botoelimina.addEventListener('click', function () { eliminarCopiaManual(manual.Numcopia); });

            if (manual.Retorn == null && manual.NumLloguer != null) {
              botoelimina.classList.add('hidden');
            }
          }
        });
        if (sessionStorage['juntari'] == 'true') { /*añade el boton afegir copia*/
          document.getElementById('boto-afegir').textContent = "Afegir Còpia";
          document.getElementById('boto-afegir').classList.remove("hidden");
          document.getElementById('boto-afegir').addEventListener('click', function () { afegirCopiaManual(); });
        }
      } else { /*si no es membre, que inicii sessió*/
        window.location.href = "login.html";
      }
    }
  }
  xhttpindividual.open('GET', '/api/manualsindividuals.php?nom=' + nommanual, true);
  xhttpindividual.send();
}