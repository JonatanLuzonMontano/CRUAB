function validarFormulari(dades) {
  var registreLabels = document.getElementsByTagName("label");

  if (dades['nom'] == "") {
    document.forms["formregistre"]["nom"].focus();
    console.log(document.forms["formregistre"]);
    registreLabels[0].classList.add('error');
    return false
  } else { registreLabels[0].classList.remove('error'); }
  if (dades['cognom1'] == "") {
    document.forms["formregistre"]["cognom1"].focus();
    registreLabels[1].classList.add('error');
    return false
  } else { registreLabels[1].classList.remove('error'); }
  if (dades['cognom2'] == "") {
    document.forms["formregistre"]["cognom1"].focus();
    registreLabels[2].classList.add('error');
    return false
  } else { registreLabels[2].classList.remove('error'); }
  if (dades['email'] == "") {
    document.forms["formregistre"]["email"].focus();
    registreLabels[4].classList.add('error');
    return false
  } else { registreLabels[4].classList.remove('error'); }
  if (dades['password'] == "") {
    document.forms["formregistre"]["password"].focus();
    registreLabels[5].classList.add('error');
    return false
  } else { registreLabels[5].classList.remove('error'); }
  if (dades['telefon'] == "") {
    document.forms["formregistre"]["telefon"].focus();
    registreLabels[6].classList.add('error');
    return false
  } else { registreLabels[6].classList.remove('error'); }
  if (dades['facultat'] == "") { /*esto es posible??*/
    document.forms["formregistre"]["facultat"].focus();
    document.getElementById('missatge').textContent = "La facultat és obligatoria";
    return false
  }
  if (dades['curs'] == "") {
    document.forms["formregistre"]["curs"].focus();
    document.getElementById('missatge').textContent = "El curs és obligatori";
    return false
  }
  if (dades['naixement'] == "") {
    document.forms["formregistre"]["naixement"].focus();
    registreLabels[9].classList.add('error');
    return false
  } else {
    registreLabels[9].classList.remove('error');
  }
  var data = Date.parse(new Date());
  var datanaixement = Date.parse(dades['naixement']);
  if (data < datanaixement) {
    document.forms["formregistre"]["naixement"].focus();
    document.getElementById('missatge').textContent = "La data de naixement ha de ser anterior a la data actual";
    return false
  }
  if (dades['treballador'] == "") {
    document.forms["formregistre"]["treballador"].focus();
    document.getElementById('missatge').textContent = "Has d'indicar si treballes a la universitat o no";
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

function enviarDades() {

  var data = {};

  data['nom'] = document.getElementById("nom").value;
  data['cognom1'] = document.getElementById("cognom1").value;
  data['cognom2'] = document.getElementById("cognom2").value;
  data['genere'] = document.getElementById("genere").value;
  data['email'] = document.getElementById("email").value;
  data['password'] = document.getElementById("password").value;
  data['telefon'] = document.getElementById("telefon").value;
  data['facultat'] = document.getElementById("facultat").value;
  data['curs'] = document.getElementById("curs").value;
  data['naixement'] = document.getElementById("naixement").value;
  data['treballador'] = getRadioCheckedValue("treballador");
  data['mote'] = document.getElementById("mote").value;

  if (validarFormulari(data)) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);
        if ((data.hasOwnProperty('Error'))) {
          document.getElementById('missatge').textContent = data["Error"];
          if (data.hasOwnProperty('DeBug')) {
            document.getElementById('missatge').textContent += data["DeBug"];
          }
        } else {
          window.location.href = "registrat.html";
        }
      }
    };

    xhttp.open('POST', '/api/registre.php', true);
    xhttp.send(JSON.stringify(data));
  }
}