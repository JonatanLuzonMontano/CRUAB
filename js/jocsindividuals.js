function eliminarCopiaJoc(copia) {
  var xhttpeliminarcopia = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search)
  var nom = params.get("nom");
  xhttpeliminarcopia.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpeliminarcopia.responseText);
      location.reload();
    }
  }
  xhttpeliminarcopia.open('DELETE', '/api/jocsindividuals.php?Nom=' + nom + '&NumCopia=' + copia, true);
  xhttpeliminarcopia.send();
}

function afegirCopiaJoc() {

  var xhttpafegircopia = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search)
  var nom = params.get("nom");
  var data = { "nom": nom };
  xhttpafegircopia.onreadystatechange = function () {
    console.log(xhttpafegircopia.responseText);
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  }
  xhttpafegircopia.open('POST', '/api/jocsindividuals.php', true);
  xhttpafegircopia.send(JSON.stringify(data));
}

function reservarJoc(joc, copia) {
  var xhttpreservar = new XMLHttpRequest();
  var data = { "usuari": sessionStorage.getItem("numsoci"), "joc": joc, "copia": copia };
  console.log(data);
  xhttpreservar.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpreservar.responseText);
      let resultat = JSON.parse(xhttpreservar.responseText);
      if (resultat.hasOwnProperty("Correcte")) {
        console.log(document.getElementById(copia));
        document.getElementById(copia).disabled = true;
        alert("Reserva sol·licitada");
        location.reload();
      } else {
        alert("Error al demanar la reserva");
        location.reload();
      }
    }
  }
  xhttpreservar.open('POST', '/api/lloguerjoc.php', true);
  xhttpreservar.send(JSON.stringify(data));
}

function obtenirJocs() {
  var xhttpindividual = new XMLHttpRequest();
  const params = new URLSearchParams(window.location.search);
  var nomjoc = params.get("nom");
  xhttpindividual.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpindividual.responseText);
      let llista = JSON.parse(xhttpindividual.responseText);
      if (sessionStorage['numsoci'] != null) {
        var llistacopies = document.getElementById('llistacopies');
        const element = llistacopies.querySelector('.element-copia');
        if (llista[0] == null) {
          afegirCopiaJoc();
        }
        llista.forEach(function (joc) {
          const clonelement = element.cloneNode(true);
          if (joc != llista[0]) {
            llistacopies.appendChild(clonelement);
          }
          var copiaactual = llistacopies.querySelector(".element-copia:last-child");
          document.getElementById('imageHolder').querySelector("img").src = joc.Imatge;
          copiaactual.id = "clon-" + joc.Numcopia;
          copiaactual.querySelector(".num-copia").textContent = "Copia " + joc.Numcopia;
          const botoreserva = copiaactual.querySelector(".boto-reserva");
          botoreserva.id = joc.Numcopia;
          botoreserva.textContent = "Reserva";
          botoreserva.disabled = false;
          botoreserva.addEventListener('click', function () { reservarJoc(nomjoc, joc.Numcopia); });
          
          if (joc.Retorn == null && joc.NumLloguer != null) {
            botoreserva.textContent = "Reservada";
            botoreserva.disabled = true;
          }

          if (sessionStorage['juntari'] == "true") {
            let botoelimina = copiaactual.querySelector(".boto-elimina");
            botoelimina.textContent = "Elimina còpia";
            botoelimina.disabled = false;
            botoelimina.classList.remove('hidden');
            botoelimina.id = -joc.Numcopia;
            botoelimina.addEventListener('click', function () { eliminarCopiaJoc(joc.Numcopia); });
            
            if (joc.Retorn == null && joc.NumLloguer != null) {
              botoelimina.classList.add('hidden');
            }

          }
        });
        if (sessionStorage['juntari'] == 'true') { /*añade el boton afegir copia*/
          document.getElementById('boto-afegir').textContent = "Afegir Còpia";
          document.getElementById('boto-afegir').classList.remove("hidden");
          document.getElementById('boto-afegir').addEventListener('click', function () { afegirCopiaJoc(); });
        }
      } else {
        window.location.href = "login.html";
      }
    }
  }
  xhttpindividual.open('GET', '/api/jocsindividuals.php?nom=' + nomjoc, true);
  xhttpindividual.send();
}