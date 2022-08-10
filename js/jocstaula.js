function validarFormulariJoc(dades){

    if(dades['nom'] == ""){
        document.forms["formafegirjoc"]["nom"].focus();
        document.getElementById('missatge').innerHTML = `<p>El nom és obligatori</p>`;
        return false
    }
    if(dades['minjugadors'] == ""){
        document.forms["formafegirjoc"]["minjugadors"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has de posar un mínim de jugadors</p>`;
        return false
    }
    if(dades['maxjugadors'] == ""){
        document.forms["formafegirjoc"]["maxjugadors"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has de posar un màxim de jugadors</p>`;
        return false
    }

    if(dades['maxjugadors'] < dades['minjugadors']){
        document.forms["formafegirjoc"]["maxjugadors"].focus();
        document.forms["formafegirjoc"]["minjugadors"].focus();
        document.getElementById('missatge').innerHTML = `<p>El màxim de jugadors ha de ser igual o superior al mínim de jugadors</p>`;
        return false
    }

    if(dades['duracio'] == ""){
        document.forms["formafegirjoc"]["duracio"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar la duració</p>`;
        return false
    }
    if(dades['dificultat'] == ""){
        document.forms["formafegirjoc"]["dificultat"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar la difucultat del joc</p>`;
        return false
    }
    if(dades['editorial'] == ""){
        document.forms["formafegirjoc"]["editorial"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar l'editorial</p>`;
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

function afegirJoc(){

    var data = {};

    data['nom'] = document.getElementById("nom").value;
    data['minjugadors'] = document.getElementById("minjugadors").value;
    data['maxjugadors'] = document.getElementById("maxjugadors").value;
    data['duracio'] = document.getElementById("duracio").value;
    data['dificultat'] = document.getElementById("dificultat").value;
    data['editorial'] = document.getElementById("editorial").value;
    data['tipus'] = getRadioCheckedValue("tipus");

    if(validarFormulariJoc(data)){

        var xhttp = new XMLHttpRequest();;

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
                    window.location.href = "jocstaula.html";
                }
            }
        };

        xhttp.open('POST', '/api/JocsTaula.php', true);
        xhttp.send(JSON.stringify(data));
    }
}

function eliminarJoc(nom){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            var data = JSON.parse(xhttp.responseText);
            if((data.hasOwnProperty('Error'))){
                alert(data["Error"] + " " + data["DeBug"]);
            } else {
                window.location.href = "jocstaula.html";
            }
        }
    }
    xhttp.open('DELETE', '/api/jocstaula.php?nom=' + nom, true);
    xhttp.send();
}

function registreJoc(){
    window.location.href = "afegirjoc.html";
}

function getJocsTaula(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var llista = JSON.parse(xhttp.responseText);
            if(sessionStorage['numsoci'] != null){
                if(sessionStorage['juntari'] == 'true'){
                    document.getElementById('registrejoc').innerHTML += 
                        `<button onclick="registreJoc()">Afegir Joc</button>`;
                    llista.forEach(function(joc){
                        let estrellas = '';
                        for(let i = 0; i < joc.Dificultat; i++){
                            estrellas += '*';
                        }
                        document.getElementById('jocs').innerHTML += 
                        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="card">
                                <a class="card-body" href="jocindividual.html?nom=${joc.Nom}">
                                    <img src="${joc.Imatge}" class="card-img-top" alt="...">
                                    <h5 class="card-title">${joc.Nom}</h5>
                                    <p class="card-text">Editorial: ${joc.Editorial}</p>
                                    <div>${estrellas}</div>
                                </a>
                                <button onclick="eliminarJoc('${joc.Nom}')">Eliminar joc</button>
                            </div>
                         </div>`;
                    });
                } else {
                    llista.forEach(function(joc){
                        let estrellas = '';
                        for(let i = 0; i < joc.Dificultat; i++){
                            estrellas += '*';
                        }
                        console.log(joc.Nom);
                        document.getElementById('jocs').innerHTML += 
                        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <a class="card" href="jocindividual.html?nom=${joc.Nom}">
                                <img src="${joc.Imatge}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${joc.Nom}</h5>
                                    <p class="card-text">Editorial: ${joc.Editorial}</p>
                                    <div>${estrellas}</div>
                                </div>
                            </a>
                         </div>`;
                        
                    });
                }

            } else {
                llista.forEach(function(joc){
                    let estrellas = '';
                    for(let i = 0; i < joc.Dificultat; i++){
                        estrellas += '*';
                    }
        
                    document.getElementById('jocs').innerHTML += 
                    `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <a class="card">
                            <img src="${joc.Imatge}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${joc.Nom}</h5>
                                <p class="card-text">Editorial: ${joc.Editorial}</p>
                                <div>${estrellas}</div>
                            </div>
                        </a>
                     </div>`;
                });
            }
        }
    };
    xhttp.open('GET', '/api/jocstaula.php', true);
    xhttp.send();
}