
function pasEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['presentacio de llistes'] === 1) {
        document.getElementById('afegirllista').classList.remove('hidden');
        document.getElementById('afegirllista').addEventListener('click', function () {
          document.getElementById('formllista').classList.remove('hidden');
        });
        document.getElementById('afegirvocal').addEventListener('click', function () { afegirVocal(); });
        document.getElementById('crearllista').addEventListener('click', function () { enviarLlista(); })
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php?opcio=passos', true);
  xhttpcheckeleccions.send();
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
    data["vocal" + (i + 1)] = element.value;
  }

  console.log(data);
  if (validarFormulari(data)) {

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
          location.reload;
        }
      }
    };

    xhttp.open('POST', '/api/eleccions.php', true);
    xhttp.send(JSON.stringify(data));
  }
}
