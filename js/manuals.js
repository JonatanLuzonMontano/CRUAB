function validarFormulariManual(dades, imatge){

    if(dades['nom'] == ""){
        document.forms["formafegirmanual"]["nom"].focus();
        document.getElementById('missatge').innerHTML = `<p>El nom és obligatori</p>`;
        return false
    }
    if(dades['genere'] == ""){
        document.forms["formafegirmanual"]["genere"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has de posar el génere</p>`;
        return false
    }
    if(dades['ambientacio'] == ""){
        document.forms["formafegirmanual"]["ambientacio"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has de posar una ambientació</p>`;
        return false
    }
    if(dades['editorial'] == ""){
        document.forms["formafegirmanual"]["editorial"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar l'editorial</p>`;
        return false
    }
    if(dades['adquirit'] == ""){
        document.forms["formafegirmanual"]["adquirit"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'indicar quan es va adquirir el manual</p>`;
        return false
    } else {
        var data = Date.parse(new Date());
        var datanadquisicio = Date.parse(dades['adquirit']);
        if(data < datanadquisicio){
            document.forms["formregistre"]["naixement"].focus();
            document.getElementById('missatge').innerHTML = `<p>La data d'adquisició ha de ser anterior a la data actual</p>`;
            return false
        }
    }

    if(imatge == null){
        document.forms["formafegirmanual"]["img-uploader"].focus();
        document.getElementById('missatge').innerHTML = `<p>Has d'introduir una imatge</p>`;
        return false
    }

    return true;
}

function afegirManual(){

    var data = {};

    data['nom'] = document.getElementById("nom").value;
    data['genere'] = document.getElementById("genere").value;
    data['ambientacio'] = document.getElementById("ambientacio").value;
    data['editorial'] = document.getElementById("editorial").value;
    data['adquirit'] = document.getElementById("adquirit").value;
    data['coleccio'] = document.getElementById("coleccio").value;

    if(validarFormulariManual(data, imatge)){
        
        var img = document.getElementById("img-uploader").files[0];
        imatge = new File([img], data["nom"] + ".jpg", {type: "image/jpeg"});

        var formData = new FormData();
        formData.append("imatge", imatge);
        formData.append("dades", data);
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(xhttp.responseText);
                if((data.hasOwnProperty('Error'))){
                    document.getElementById('missatge').innerHTML = `<p>${data["Error"]}</p>`;
                    if(data.hasOwnProperty('DeBug')){
                        document.getElementById('missatge').innerHTML += `<p>${data["DeBug"]}</p>`;
                    }
                } else {
                    window.location.href = "http://www.cruab.local/manuals.html";
                }
            }
        };

        xhttp.open('POST', 'http://www.cruab.local/api/manuals.php', true);
        xhttp.setRequestHeader("Content-Type", "multipart/form-data");
        xhttp.send(formData);

    }
}

function eliminarManual(nom){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
                if((data.hasOwnProperty('Error'))){
                    alert(data["Error"] + " " + data["DeBug"]);
                } else {
                    window.location.href = "http://www.cruab.local/manuals.html";
                }
        }
    }
    xhttp.open('DELETE', 'http://www.cruab.local/api/manuals.php?nom=' + nom, true);
    xhttp.send();
}

function registreManual(){
    window.location.href = "http://www.cruab.local/afegirmanual.html";
}

function getManuals(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var llista = JSON.parse(xhttp.responseText);
            if(sessionStorage['numsoci'] != null){
                if(sessionStorage['juntari'] == 'true'){
                    document.getElementById('registremanual').innerHTML += 
                    `<button onclick="registreManual()">Afegir Manual</button>`;
                    llista.forEach(function(manual){
                        document.getElementById('manuals').innerHTML += 
                        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="card" >
                                <a class="card-body" href="manualsindividuals.html?nom=${manual.Nom}">
                                    <img src="${manual.Imatge}" class="card-img-top" alt="...">
                                    <h5 class="card-title">${manual.Nom}</h5>
                                    <p class="card-text">Abientació: ${manual.Ambientacio}</p>
                                </a>
                                <button onclick="eliminarManual('${manual.Nom}')">Eliminar manual</button>
                            </div>
                        </div>`;
                    });
                } else {
                    llista.forEach(function(manual){
        
                        document.getElementById('manuals').innerHTML += 
                        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <a class="card" href = "manualsindividuals.html?nom=${manual.Nom}">
                                <div class="card-body">
                                    <img src="${manual.Imatge}" class="card-img-top" alt="...">
                                    <h5 class="card-title">${manual.Nom}</h5>
                                    <p class="card-text">Abientació: ${manual.Ambientacio}</p>
                                </div>
                            </a>
                        </div>`;
                    });
                }

            } else {
                llista.forEach(function(manual){
        
                    document.getElementById('manuals').innerHTML += 
                    `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <a class="card">
                            <div class="card-body">
                                <img src="${manual.Imatge}" class="card-img-top" alt="...">
                                <h5 class="card-title">${manual.Nom}</h5>
                                <p class="card-text">Abientació: ${manual.Ambientacio}</p>
                            </div>
                        </a>
                    </div>`;
                });
            }
            
        }
    };
    xhttp.open('GET', 'http://www.cruab.local/api/manuals.php', true);
    xhttp.send();
}