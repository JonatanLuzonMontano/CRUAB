function obtenirManuals(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            var data = JSON.parse(xhttp.responseText);
            console.log(data);

            var t = document.querySelector('#productrow'),
            td = t.content.querySelectorAll("td");
            for(let i = 0; i < data.length; i++){
                td[0].textContent = data[i]["nom"];
                td[1].textContent = data[i]["primercognom"];
                td[2].getElementsByTagName("img")[0].src = "../" + data[i]["Imatge"];
                td[3].textContent = data[i]["Copia"];
                td[4].getElementsByTagName("button")[0].textContent="Validar";
                td[4].getElementsByTagName("button")[0].id=data[i]["NumLloguer"];
                td[4].getElementsByTagName("button")[1].textContent="Rebutjar";
                td[4].getElementsByTagName("button")[1].id=-data[i]["NumLloguer"];
                // Clonar la nueva fila e insertarla en la tabla
                var tb = document.querySelector("tbody");
                var clone = document.importNode(t.content, true);
                tb.appendChild(clone);
                document.getElementById(data[i]["NumLloguer"]).addEventListener("click", function(){
                    validarLlogerManual(data[i]["NumLloguer"], sessionStorage["numsoci"]);
                });
                document.getElementById(-data[i]["NumLloguer"]).addEventListener("click", function(){
                    rebutjaLlogerManual(data[i]["NumLloguer"], sessionStorage["numsoci"]);
                });
            }

        }
    };
    xhttp.open('GET', '/api/validarlloguermanual.php', true);
    xhttp.send();
}

function validarLlogerManual(numlloguer, numsoci){
    var xhttp = new XMLHttpRequest();
    var data= {};
    data["numlloguer"] = numlloguer;
    data["numsoci"] = numsoci;
    xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('POST', '/api/validarlloguermanual.php', true);
    xhttp.send(JSON.stringify(data));
}

function rebutjaLlogerManual(numlloguer, numsoci){
    var xhttp = new XMLHttpRequest();
    var data= {};
    xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('DELETE', '/api/validarlloguermanual.php?numlloguer='+numlloguer+'&numsoci='+numsoci, true);
    xhttp.send();
}