function eliminarCopiaJoc(copia){
    var xhttpeliminarcopia = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nom = params.get("nom");
    xhttpeliminarcopia.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttpeliminarcopia.responseText);
            location.reload();
        }
    }
    xhttpeliminarcopia.open('DELETE', 'http://www.cruab.local/api/jocsindividuals.php?Nom='+nom+'&NumCopia='+copia, true);
    xhttpeliminarcopia.send();
}

function afegirCopiaJoc(){

    var xhttpafegircopia = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nom = params.get("nom");
    var data = {"nom": nom};
    xhttpafegircopia.onreadystatechange = function(){
        console.log(xhttpafegircopia.responseText);
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    }
    xhttpafegircopia.open('POST', 'http://www.cruab.local/api/jocsindividuals.php', true);
    xhttpafegircopia.send(JSON.stringify(data));
}

function reservarJoc(joc, copia){
    var xhttpreservar = new XMLHttpRequest();
    var data = {"usuari": sessionStorage.getItem("numsoci"), "joc": joc, "copia": copia};
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
                alert("Error al demanar la reserva");
                location.reload();
            }
        }
    }
    xhttpreservar.open('POST', 'http://www.cruab.local/api/lloguerjoc.php', true);
    xhttpreservar.send(JSON.stringify(data));
}

function obtenirJocs(){
    console.log("hi");
    var xhttpindividual = new XMLHttpRequest();
    const params = new URLSearchParams(window.location.search)
    var nomjoc = params.get("nom");
    xhttpindividual.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttpindividual.responseText);
            let llista = JSON.parse(xhttpindividual.responseText);
            console.log(llista);
            if(sessionStorage['numsoci'] != null){
                document.getElementById('llistajocs').innerHTML += `<table id="taulajocs">`;
                llista.forEach(function(jocs){
                    document.getElementById('llistajocs').innerHTML += 
                    `<tr>
                        <td>
                            <img src="${jocs.Imatge}">
                        </td>
                        <td>
                            Copia ${jocs.Numcopia} del joc
                        </td>
                        <td>
                            <button id="${jocs.Numcopia}" onclick="reservarJoc('${nomjoc}', '${jocs.Numcopia}')">Reserva</button>
                        </td>`;
                    if(sessionStorage['juntari'] == 'true'){
                        document.getElementById('llistajocs').innerHTML += 
                        `<td>
                            <button id="-${jocs.Numcopia}" onclick="eliminarCopiaJoc(${jocs.Numcopia})">Elimina copia</button>
                        </td>`;

                        if(jocs.Retorn == null && jocs.NumLloguer != null){
                            document.getElementById(-jocs.Numcopia).disabled = true;
                        }
                    }
                    document.getElementById('llistajocs').innerHTML += 
                    `</tr><br>`;

                    if(jocs.Retorn == null && jocs.NumLloguer != null){
                        document.getElementById(jocs.Numcopia).disabled = true;
                        document.getElementById(jocs.Numcopia).innerHTML = "Reservat";
                    }

                });

                document.getElementById('llistajocs').innerHTML += `</table>`;

                if(sessionStorage['juntari'] == 'true'){
                    document.getElementById('afegircopia').innerHTML += 
                    `<button onclick="afegirCopiaJoc()">Afegir Copia</button>`;
                }

            } else {
                window.location.href = "http://www.cruab.local/login.html";
            }
            
        }
    }
    console.log(nomjoc);
    xhttpindividual.open('GET', 'http://www.cruab.local/api/jocsindividuals.php?nom=' + nomjoc, true);
    xhttpindividual.send();
}