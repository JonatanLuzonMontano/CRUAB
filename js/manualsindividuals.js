function eliminarCopiaManual(copia){
    console.log(copia);
    var xhttpeliminarcopia = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nom = params.get("nom");
    xhttpeliminarcopia.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttpeliminarcopia.responseText);
            location.reload();
        }
    }
    xhttpeliminarcopia.open('DELETE', 'http://www.cruab.local/api/manualsindividuals.php?Nom='+nom+'&NumCopia='+copia, true);
    xhttpeliminarcopia.send();
}

function afegirCopiaManual(){

    var xhttpafegircopia = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nom = params.get("nom");
    var data = {"nom": nom};
    xhttpafegircopia.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    }
    xhttpafegircopia.open('POST', 'http://www.cruab.local/api/manualsindividuals.php', true);
    xhttpafegircopia.send(JSON.stringify(data));
}

function reservarManual(manual, copia){
    var xhttpreservar = new XMLHttpRequest();
    var data = {"usuari": sessionStorage.getItem("numsoci"), "manual": manual, "copia": copia};
    console.log(data);
    xhttpreservar.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttpreservar.responseText);
            let resultat = JSON.parse(xhttpreservar.responseText);
            if(resultat.hasOwnProperty("Correcte")){
                document.getElementById(copia).disabled = true;
                alert("Reserva sol·licitada");
                location.reload();
            } else {
                alert(resultat["Error"]);
                location.reload();
            }
        }
    }
    xhttpreservar.open('POST', 'http://www.cruab.local/api/lloguermanual.php', true);
    xhttpreservar.send(JSON.stringify(data));
}

function obtenirManuals(){
    var xhttpindividual = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nommanual = params.get("nom");
    xhttpindividual.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttpindividual.responseText);
            let llista = JSON.parse(xhttpindividual.responseText);
            console.log(llista);
            if(sessionStorage['numsoci'] != null){
                
                document.getElementById('llistamanuals').innerHTML += `<table>`

                llista.forEach(function(manual){

                    document.getElementById('llistamanuals').innerHTML += 
                    `<tr>
                        <td>
                            <img src="${manual.Imatge}">
                        </td>
                        <td>
                            Copia ${manual.Numcopia} del manual
                        </td>
                        <td>
                        <button id="${manual.Numcopia}" onclick="reservarManual('${nommanual}', '${manual.Numcopia}')">Reserva</button>
                        </td>`;
                    if(sessionStorage['juntari'] == "true"){
                        document.getElementById('llistamanuals').innerHTML += 
                        `<td>
                            <button id="-${manual.Numcopia}" onclick="eliminarCopiaManual(${manual.Numcopia})">Elimina copia</button>
                        </td>`;
                                            
                        if(manual.Retorn == null && manual.NumLloguer != null){
                            document.getElementById(-manual.Numcopia).disabled = true;
                        }
                    }
                    document.getElementById('llistamanuals').innerHTML += 
                    `</tr><br>`;

                    if(manual.Retorn == null && manual.NumLloguer != null){
                        document.getElementById(manual.Numcopia).disabled = true;
                        document.getElementById(manual.Numcopia).innerHTML = "Reservat";
                    }
                });

                document.getElementById('llistamanuals').innerHTML += `</table>`
                
                if(sessionStorage['juntari'] == 'true'){
                    document.getElementById('afegircopia').innerHTML += 
                    `<button onclick="afegirCopiaManual()">Afegir Copia</button>`;

                }

            } else {
                window.location.href = "http://www.cruab.local/login.html";
            }
            
        }
    }

    xhttpindividual.open('GET', 'http://www.cruab.local/api/manualsindividuals.php?nom=' + nommanual, true);
    xhttpindividual.send();
}