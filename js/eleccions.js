
function pasEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.table(llista);
      if (llista['presentacio de llistes'] === 1) {
        obtenirLlistes();
        document.getElementById('afegirllista').classList.remove('hidden');
        document.getElementById('afegirllista').addEventListener('click', function () {
          document.getElementById('formllista').classList.remove('hidden');
          obtenirMembres("formllista");
        });
        document.getElementById('afegirvocal').addEventListener('click', function () { afegirVocal('#Vocals'); });
        document.getElementById('crearllista').addEventListener('click', function () { enviarLlista(); });
        document.querySelector('.editar').classList.remove('hidden');
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
      //console.log(xhttpllistes.responseText);
      var data = JSON.parse(xhttpllistes.responseText);
      console.table(data);

      const taula = document.getElementsByTagName('tbody')[0];
      const filera = taula.querySelector('tr:last-child');

      data.forEach(function (element) {
        let fileraclon = filera.cloneNode(true);
        let td = fileraclon.querySelectorAll('td:not(:has(button))');

        td.forEach(function (element) {
          var text = element.textContent;
          if (/[a-zA-Z]+/g.test(text)) {
            element.textContent = "";
          }
        });

        if (taula.querySelector('tr:last-child').id !== "" && taula.querySelector('tr:last-child').id !== element.Nom) {
          taula.appendChild(fileraclon);
        }
        taula.querySelector('tr:last-child').id = element.Nom;

        const fileraactual = document.getElementById(element.Nom);
        const carreg = element.Carreg;
        if (carreg.startsWith("Vocal")) {
          if (fileraactual.getElementsByClassName('Vocals')[0].textContent === "") {
            if (element.pseudonim != "") {
              fileraactual.getElementsByClassName('Vocals')[0].textContent = element.nom + ' "' + element.pseudonim + '" ' + element.primercognom;
            } else {
              fileraactual.getElementsByClassName('Vocals')[0].textContent = element.nom + ' ' + element.primercognom;
            }
          } else {
            if (element.pseudonim != "") {
              fileraactual.getElementsByClassName('Vocals')[0].textContent += ', ' + element.nom + ' "' + element.pseudonim + '" ' + element.primercognom;
            } else {
              fileraactual.getElementsByClassName('Vocals')[0].textContent += ', ' + element.nom + ' ' + element.primercognom;
            }
          }

        }
        else {
          if (element.pseudonim != "") {
            fileraactual.getElementsByClassName(element.Carreg)[0].textContent = element.nom + ' "' + element.pseudonim + '" ' + element.primercognom;
          } else {
            fileraactual.getElementsByClassName(element.Carreg)[0].textContent = element.nom + ' ' + element.primercognom;
          }
        }
      });
      let botoelimina = document.getElementsByClassName('eliminar');
      for (let i = 0; i < botoelimina.length; i++) {
        const element = botoelimina[i];
        element.classList.remove('hidden');
        element.addEventListener('click', function () { eliminarLlista(i); });
      }
      let botoeditar = document.getElementsByClassName('editar');
      for (let i = 0; i < botoeditar.length; i++) {
        const element = botoeditar[i];
        element.classList.remove('hidden');
        element.addEventListener('click', function () { editarLlista(i); });
      }
    }
  };
  xhttpllistes.open('GET', '/api/llistes.php', true);
  xhttpllistes.send();
}

function eliminarLlista(index) {
  if (confirm("Estas segur?")) {
    const llistallistes = document.querySelectorAll('.table-holder .llista');
    //llistallistes[index].classList.add('hidden');
    var data = {};
    data['nom'] = llistallistes[index].id;

    var xhttpeliminarllista = new XMLHttpRequest;
    xhttpeliminarllista.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttpeliminarllista.responseText);
        location.reload();
      }
    };
    xhttpeliminarllista.open('DELETE', '/api/llistes.php', true);
    xhttpeliminarllista.send(JSON.stringify(data));
  }
}

function editarLlista(index) {
  if (checkEditaActiu()) {
    alert("Siusplau, deixa d'editar una llista per poder editar un altra");
  } else {
    let presi = null;
    let vice = null;
    let treso = null;
    let secre = null;
    let vocals = null;
    const llistallistes = document.querySelectorAll('.table-holder .llista');
    llistallistes[index].classList.add('editant');
    llistallistes[index].querySelectorAll('td:not(:has(button))').forEach(function (element, index) {
      const text = element.textContent;
      switch (index) {
        case 0:
          presi = text;
          break;
        case 1:
          vice = text;
          break;
        case 2:
          treso = text;
          break;
        case 3:
          secre = text;
          break;
        case 4:
          vocals = text;
          break;

        default:
          break;
      }
      if (/[a-zA-Z]+/g.test(text)) {
        element.textContent = "";
      }
      const carreg = element.className;
      let selectpercopiar = null;
      if (carreg === "Vocals") {
        const llistavocals = vocals.split(', ');
        for (let a = 0; a < llistavocals.length; a++) {
          selectpercopiar = document.querySelector('#Vocal-1 select').cloneNode(true);
          element.appendChild(selectpercopiar);
        }
        const afegirvocal = document.getElementById('templatebutton').querySelector('input');
        element.appendChild(afegirvocal);
        element.querySelector('input').addEventListener('click', function () {
          afegirVocal('.editant .Vocals', llistavocals.length);
          element.appendChild(afegirvocal);
        });

      } else {
        selectpercopiar = document.getElementById(carreg).cloneNode(true);
        element.appendChild(selectpercopiar);
      }

      if (element.querySelectorAll('select').length > 1) {
        element.querySelectorAll('select').forEach(function (e, index) {
          e.id = "editar" + "Vocal-" + (index + 1);
        });
      } else {
        element.querySelector('select').id = "editar" + carreg;
      }
    });

    const llistaid = llistallistes[index].id;
    obtenirMembres(llistaid);
    setTimeout(() => {
      llistallistes[index].querySelectorAll('td:not(:has(button))').forEach(function (element) {
        let opcions = null;
        let select = null;
        switch (element.className) {
          case "President":
            select = element.querySelector('select');
            opcions = select.querySelectorAll('option');
            for (let j = 0; j < opcions.length; j++) {
              const el = select.querySelectorAll('option')[j];
              if (el.textContent.includes(presi)) {
                select.value = el.value;
                break;
              }
            }
            break;
          case "Vicepresident":
            select = element.querySelector('select');
            opcions = select.querySelectorAll('option');
            for (let j = 0; j < opcions.length; j++) {
              const el = select.querySelectorAll('option')[j];
              if (el.textContent.includes(vice)) {
                select.value = el.value;
                break;
              }
            }
            break;
          case "Tresorer":
            select = element.querySelector('select');
            opcions = select.querySelectorAll('option');
            for (let j = 0; j < opcions.length; j++) {
              const el = select.querySelectorAll('option')[j];
              if (el.textContent.includes(treso)) {
                select.value = el.value;
                break;
              }
            }
            break;
          case "Secretari":
            select = element.querySelector('select');
            opcions = select.querySelectorAll('option');
            for (let j = 0; j < opcions.length; j++) {
              const el = select.querySelectorAll('option')[j];
              if (el.textContent.includes(secre)) {
                select.value = el.value;
                break;
              }
            }
            break;
          case "Vocals":
            const llistavocals = vocals.split(', ');
            const selects = element.querySelectorAll('select');

            selects.forEach(function (select, iselect) {
              opcions = select.querySelectorAll('option');

              for (let j = 0; j < opcions.length; j++) {
                const el = select.querySelectorAll('option')[j];
                if (el.textContent.includes(llistavocals[iselect])) {
                  select.value = el.value;
                  break;
                }
              }
            });


            break;

          default:
            break;
        }
      });
    }, 100);

  }
}

function checkEditaActiu() {
  const llistallistes = document.querySelectorAll('.table-holder .llista');
  let veritat = false;
  for (let i = 0; i < llistallistes.length; i++) {
    const element = llistallistes[i];
    if (element.classList.contains('editant')) {
      veritat = true;
    }
  }
  return veritat
}

function canviarLlista(index) { }

function obtenirMembres(formulari) {
  var xhttpmembres = new XMLHttpRequest();
  xhttpmembres.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(xhttpmembres.responseText);
      var data = JSON.parse(xhttpmembres.responseText);
      data = data.sort(alphabetic);
      //console.table(data);
      const pare = document.querySelector('[id="' + formulari + '"]');
      const selects = pare.querySelectorAll('select');
      function alphabetic(a, b) {
        if (a['nom'] < b['nom']) return -1;
        if (a['nom'] > b['nom']) return 1;
        return 0;
      }

      selects.forEach(function (select) {
        if (!select.querySelector('option + option')) {
          data.forEach(function (membre) {
            if (membre.pseudonim != "") {
              select.innerHTML += '<option value="' + membre.numsoci + '" >' + membre.nom + ' "' + membre.pseudonim + '" ' + membre.primercognom + '</option>';
            } else {
              select.innerHTML += '<option value="' + membre.numsoci + '" >' + membre.nom + ' ' + membre.primercognom + '</option>';
            }
          });
        }

      });
    }
  };
  xhttpmembres.open('GET', '/api/registre.php?tipus=actius', true);
  xhttpmembres.send();
}

function afegirVocal(parent, numvocalstaula) {
  let selectparent = document.querySelector(parent);
  let vocalacopiar = null;

  let vocalclon;
  let numvocals = null;
  if (selectparent.classList.contains('rows')) {
    vocalacopiar = document.querySelector("#Vocal-1");
    vocalclon = vocalacopiar.cloneNode(true);
    numvocals = selectparent.querySelectorAll('div:not(:first-child)').length;
    selectparent.appendChild(vocalclon);
    selectparent.querySelector('div:last-child').id = "Vocal-" + (numvocals);
  } else {
    vocalacopiar = document.querySelector(".editant .Vocals select");
    vocalclon = vocalacopiar.cloneNode(true);
    selectparent.appendChild(vocalclon);
    numvocals = numvocalstaula;
    selectparent.querySelector('select:last-of-type').id = "editarVocal-" + (numvocals);
  }
}

function validarFormulari(dades) {
  var registreLabels = document.getElementsByTagName("label");
  let dadestotes = true;
  if (dades['carregs']['President'] == "") {
    document.forms["formllista"]["President"].focus();
    registreLabels[0].classList.add('error');
    dadestotes = false;
  } else { registreLabels[0].classList.remove('error'); }
  if (dades['carregs']['Vicepresident'] == "") {
    document.forms["formllista"]["Vicepresident"].focus();
    registreLabels[1].classList.add('error');
    dadestotes = false;
  } else { registreLabels[1].classList.remove('error'); }
  if (dades['carregs']['Tresorer'] == "") {
    document.forms["formllista"]["Tresorer"].focus();
    registreLabels[2].classList.add('error');
    dadestotes = false;
  } else { registreLabels[2].classList.remove('error'); }
  if (dades['carregs']['Secretari'] == "") {
    document.forms["formllista"]["Secretari"].focus();
    registreLabels[3].classList.add('error');
    dadestotes = false;
  } else { registreLabels[3].classList.remove('error'); }
  return dadestotes;
}

function enviarLlista() {
  var data = {};
  data['nom'] = document.getElementById('nom').value;

  var carregs = {};
  carregs['President'] = document.getElementById("President").value;
  carregs['Vicepresident'] = document.getElementById("Vicepresident").value;
  carregs['Tresorer'] = document.getElementById("Tresorer").value;
  carregs['Secretari'] = document.getElementById("Secretari").value;

  const vocals = document.getElementsByClassName('Vocal');
  for (let i = 0; i < vocals.length; i++) {
    const element = vocals[i].querySelector('select');
    carregs["Vocal " + (i + 1)] = element.value;
  }
  data['carregs'] = carregs;

  console.table(data);
  if (validarFormulari(data)) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);
        console.table(data);
        if ((data.hasOwnProperty('Error'))) {
          alert("error");
          //document.getElementById('missatge').textContent = data["Error"];
          if (data.hasOwnProperty('DeBug')) {
            alert("debug");
            //document.getElementById('missatge').textContent += data["DeBug"];
          }
        } else {
          location.reload();
        }
      }
    };

    xhttp.open('POST', '/api/llistes.php', true);
    xhttp.send(JSON.stringify(data));
  } else {
    alert("error al inserir les dades");
  }
}
