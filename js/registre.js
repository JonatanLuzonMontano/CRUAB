function validarFormulari(dades){

    if(dades['nom'] == ""){
        document.forms["formregistre"]["nom"].focus();
        document.getElementById('missatge').innerHTML = `<p>El nom és obligatori</p>`;
        return false
    }
    if(dades['cognom1'] == ""){
        document.forms["formregistre"]["cognom1"].focus();
        document.getElementById('missatge').innerHTML = `<p>El primer cognom és obligatori</p>`;
        return false
    }
    if(dades['email'] == ""){
        document.forms["formregistre"]["email"].focus();
        document.getElementById('missatge').innerHTML = `<p>El email és obligatori</p>`;
        return false
    }
    if(dades['password'] == ""){
        document.forms["formregistre"]["password"].focus();
        document.getElementById('missatge').innerHTML = `<p>La contrasenya és obligatoria</p>`;
        return false
    }
    if(dades['telefon'] == ""){
        document.forms["formregistre"]["telefon"].focus();
        document.getElementById('missatge').innerHTML = `<p>El telefon és obligatori</p>`;
        return false
    }
    if(dades['facultat'] == ""){
        document.forms["formregistre"]["facultat"].focus();
        document.getElementById('missatge').innerHTML = `<p>La facultat és obligatoria</p>`;
        return false
    }
    if(dades['curs'] == ""){
        document.forms["formregistre"]["curs"].focus();
        document.getElementById('missatge').innerHTML = `<p>El curs és obligatori</p>`;
        return false
    }
    if(dades['naixement'] == ""){
        document.forms["formregistre"]["naixement"].focus();
        document.getElementById('missatge').innerHTML = `<p>La data de naixement és obligatoria</p>`;
        return false
    } else {
        var data = Date.parse(new Date());
        var datanaixement = Date.parse(dades['naixement']);
        if(data < datanaixement){
            document.forms["formregistre"]["naixement"].focus();
            document.getElementById('missatge').innerHTML = `<p>La data de naixement ha de ser anterior a la data actual</p>`;
            return false
        }
    }
    if(dades['treballador'] == ""){
        document.forms["formregistre"]["treballador"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar si treballes a la universitat o no</p>`;
        return false
    }

    return true;
}

function getRadioCheckedValue(radio_name)
{
   var oRadio = document.forms[0].elements[radio_name];

   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }

   return '';
}

function enviarDades(){

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

    if(validarFormulari(data)){

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200){
                console.log(xhttp.responseText);
                var data = JSON.parse(xhttp.responseText);
                if((data.hasOwnProperty('Error'))){
                    document.getElementById('missatge').innerHTML = `<p>${data["Error"]}</p>`;
                    if(data.hasOwnProperty('DeBug')){
                        document.getElementById('missatge').innerHTML += `<p>${data["DeBug"]}</p>`;
                    }
                } else {
                    window.location.href = "http://www.cruab.local/registrat.html";
                }
            }
        };

        xhttp.open('POST', 'http://www.cruab.local/api/registre.php', true);
        xhttp.send(JSON.stringify(data));
    }
}