function obtenirMembres(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data);

            var t = document.querySelector('#productrow'),
            td = t.content.querySelectorAll("td");
            for(let i = 0; i < data.length; i++){
                td[0].textContent = data[i]["nom"];
                td[1].textContent = data[i]["primercognom"];
                td[2].textContent = data[i]["email"];
                td[3].getElementsByTagName("button")[0].innerText="Validar";
                td[3].getElementsByTagName("button")[0].id=data[i]["numsoci"];
                td[3].getElementsByTagName("button")[1].innerText="Rebutjar";
                td[3].getElementsByTagName("button")[1].id=-data[i]["numsoci"];
                
                // Clonar la nueva fila e insertarla en la tabla
                var tb = document.querySelector("tbody");
                var clone = document.importNode(t.content, true);
                tb.appendChild(clone);
                document.getElementById(data[i]["numsoci"]).addEventListener("click", function(){
                    validarMembres(data[i]["numsoci"]);
                });
                document.getElementById(-data[i]["numsoci"]).addEventListener("click", function(){
                    rebutjaValidacio(data[i]["numsoci"]);
                });
            }
        }
    };
    xhttp.open('GET', 'http://www.cruab.local/api/validarmembres.php', true);
    xhttp.send();
}

function validarMembres(numsoci){
    var xhttp = new XMLHttpRequest();
    var data= {};
    data["numsoci"] = numsoci;
    xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('PUT', 'http://www.cruab.local/api/validarmembres.php', true);
    xhttp.send(JSON.stringify(data));
}

function rebutjaValidacio(numsoci){
    var xhttp = new XMLHttpRequest();
    var data= {};
    xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open('DELETE', 'http://www.cruab.local/api/validarmembres.php?numsoci='+numsoci, true);
    xhttp.send();
}