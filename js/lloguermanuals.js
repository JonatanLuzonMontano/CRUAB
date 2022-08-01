
function obtenirLloguersManuals(){
    console.log("joi");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data);
            var t = document.querySelector('#productrow'),
            td = t.content.querySelectorAll("td");
            if(data == null){
                document.getElementById("producttable").innerText = "No tens cap reserva feta o aprovada per junta";
            } else {
                for(let i = 0; i < data.length; i++){
                    td[0].getElementsByTagName("img")[0].src = "../" + data[i]["Imatge"];
                    td[1].textContent = data[i]["Copia"];
                    td[2].getElementsByTagName("button")[0].innerText="Recollir";
                    td[2].getElementsByTagName("button")[0].id=data[i]["NumLloguer"];
     
                    if(data[i]["Recollida"] == null){
                        td[2].getElementsByTagName("button")[1].innerText="Cancel·la lloguer";
                    } else {
                        td[2].getElementsByTagName("button")[1].innerText="Retorna Joc";
                    }
                    
                    td[2].getElementsByTagName("button")[1].id=-data[i]["NumLloguer"];
                    
                    // Clonar la nueva fila e insertarla en la tabla
                    var tb = document.querySelector("tbody");
                    var clone = document.importNode(t.content, true);
                    tb.appendChild(clone);
    
                    if(data[i]["Recollida"] != null){
                        document.getElementById(data[i]["NumLloguer"]).remove();
                    } else {
                        document.getElementById(data[i]["NumLloguer"]).addEventListener("click", function(){
                            recollirLlogerManual(data[i]["NumLloguer"]);
                        });
                    }
    
                    document.getElementById(-data[i]["NumLloguer"]).addEventListener("click", function(){
                        retornaLlogerManual(data[i]["NumLloguer"]);
                    });
                }
            }
        }
    };
    xhttp.open('GET', 'http://www.cruab.local/api/lloguermanual.php?numsoci='+sessionStorage["numsoci"], true);
    xhttp.send();
}

function recollirLlogerManual(numlloguer){
    var xhttp = new XMLHttpRequest();
    var data= {};
    data["numlloguer"] = numlloguer;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('PUT', 'http://www.cruab.local/api/lloguermanual.php', true);
    xhttp.send(JSON.stringify(data));
}

function retornaLlogerManual(numlloguer){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('DELETE', 'http://www.cruab.local/api/lloguermanual.php?numlloguer='+numlloguer, true);
    xhttp.send();
}