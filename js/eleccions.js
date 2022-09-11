
function pasEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['presentacio de llistes'] === 1) {
        obtenirLlistes();
        document.getElementById('afegirllista').classList.remove('hidden');
        let botoelimina = document.getElementsByClassName('eliminar');
        console.log(botoelimina);
        for (let i = 0; i < botoelimina.length; i++) {
          console.log("I = " + i + ", element es: " + botoelimina[i]);
          const element = botoelimina[i];
          element.classList.remove('hidden');
          console.log(element);
          element.addEventListener('click', function () { eliminarLlista(i); });
        }
        document.getElementById('afegirllista').addEventListener('click', function () {
          document.getElementById('formllista').classList.remove('hidden');
          obtenirMembres();
        });
        document.getElementById('afegirvocal').addEventListener('click', function () { afegirVocal(); });
        document.getElementById('crearllista').addEventListener('click', function () { enviarLlista(); })
        console.log(botoelimina);
      }
      if (llista['votacio'] === 1) {
        obtenirLlistes();


        const botovotar = document.getElementsByClassName('votar');
        for (i = 0; i < botovotar.length; i++) {
          botovotar[i].classList.remove('hidden');
          //element.addEventListener('click', function () { votar(); });
        }
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php?opcio=passos', true);
  xhttpcheckeleccions.send();
}

function obtenirLlistes() {
  var xhttpllistes = new XMLHttpRequest();
  xhttpllistes.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpllistes.responseText);
      var data = JSON.parse(xhttpllistes.responseText);
      console.log(data);

      const taula = document.getElementsByTagName('tbody')[0];
      const filera = taula.querySelector('tr:last-child');
     
      data.forEach(function (element) {
        let fileraclon = filera.cloneNode(true);
        let td = fileraclon.querySelectorAll('td:not(:last-child)');
        td.forEach( function(element) {
          if (element.textContent != "") {
            element.textContent = "";
          }
        });
        
        if (taula.querySelector('tr:last-child').id !== "" && taula.querySelector('tr:last-child').id !== element.Nom) {
          taula.appendChild(fileraclon);
        }
        taula.querySelector('tr:last-child').id = element.Nom;

        const fileraactual = document.getElementById(element.Nom);
        if (element.pseudonim != "") {
          fileraactual.getElementsByClassName(element.Carreg)[0].textContent = element.nom + ' "' + element.pseudonim + '" ' + element.primercognom;
        } else {
          fileraactual.getElementsByClassName(element.Carreg)[0].textContent = element.nom + ' ' + element.primercognom;
        }
      });
    }
  };
  xhttpllistes.open('GET', '/api/llistes.php', true);
  xhttpllistes.send();
}

function eliminarLlista(index) {
  const llistallistes = document.querySelectorAll('.table-holder .llista');
  llistallistes[index].classList.add('hidden');
}


function obtenirMembres() {
  var xhttpmembres = new XMLHttpRequest();
  xhttpmembres.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpmembres.responseText);
      var data = JSON.parse(xhttpmembres.responseText);
      data = data.sort(alphabetic);
      console.log(data);
      const selects = document.querySelectorAll('#formllista select');
      function alphabetic(a, b) {
        if (a['nom'] < b['nom']) return -1;
        if (a['nom'] > b['nom']) return 1;
        return 0;
      }

      selects.forEach(function (select) {
        data.forEach(function (membre) {
          if (membre.pseudonim != "") {
            select.innerHTML += '<option value="' + membre.numsoci + '" >' + membre.nom + ' "' + membre.pseudonim + '" ' + membre.primercognom + '</option>';
          } else {
            select.innerHTML += '<option value="' + membre.numsoci + '" >' + membre.nom + ' ' + membre.primercognom + '</option>';
          }
        });
      });
    }
  };
  xhttpmembres.open('GET', '/api/registre.php?tipus=actius', true);
  xhttpmembres.send();
}

function afegirVocal() {
  let vocals = document.getElementById('vocals');
  const vocalacopiar = document.querySelector("#vocal-1");
  const vocalclon = vocalacopiar.cloneNode(true);

  let numvocals = vocals.querySelectorAll('div:not(:first-child)').length;

  vocals.appendChild(vocalclon);
  vocals.querySelector('div:last-child').id = "vocal-" + (numvocals + 1);
}

function validarFormulari(dades) {
  var registreLabels = document.getElementsByTagName("label");

  if (dades['president'] == "") {
    document.forms["formllista"]["president"].focus();
    console.log(document.forms["formllista"]);
    registreLabels[0].classList.add('error');
    return false
  } else { registreLabels[0].classList.remove('error'); }
  if (dades['vicepresident'] == "") {
    document.forms["formllista"]["vicepresident"].focus();
    registreLabels[1].classList.add('error');
    return false
  } else { registreLabels[1].classList.remove('error'); }
  if (dades['tresorer'] == "") {
    document.forms["formllista"]["tresorer"].focus();
    registreLabels[2].classList.add('error');
    return false
  } else { registreLabels[2].classList.remove('error'); }
  if (dades['secretari'] == "") {
    document.forms["formllista"]["secretari"].focus();
    registreLabels[3].classList.add('error');
    return false
  } else { registreLabels[3].classList.remove('error'); }

  return true;

}

function enviarLlista() {

  var data = {};

  data['president'] = document.getElementById("president").value;
  data['vicepresident'] = document.getElementById("vicepresident").value;
  data['tresorer'] = document.getElementById("tresorer").value;
  data['secretari'] = document.getElementById("secretari").value;

  const vocals = document.getElementsByClassName('vocal');
  for (let i = 0; i < vocals.length; i++) {
    const element = vocals[i].querySelector('select');
    data["vocal " + (i + 1)] = element.value;
  }

  console.log(data);
  //if (validarFormulari(data)) {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var data = JSON.parse(xhttp.responseText);
      if ((data.hasOwnProperty('Error'))) {
        alert("error");
        //document.getElementById('missatge').textContent = data["Error"];
        if (data.hasOwnProperty('DeBug')) {
          alert("debug");
          //document.getElementById('missatge').textContent += data["DeBug"];
        }
      } else {
        location.reload;
      }
    }
  };

  xhttp.open('POST', '/api/llistes.php', true);
  xhttp.send(/*JSON.stringify(data)*/);
  //}
}






