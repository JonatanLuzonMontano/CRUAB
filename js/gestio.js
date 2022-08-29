
function obrirLlistes() {
  if (confirm("Estas segur?")) {
    alert("obrint periode de presentacio de llistes");





    //aqui hay que ahcer una http request con un 
    //put o post de llistes para hacer que nignuna sea ganadora
  }
}

function votacio() {
  var data = {};

  data['pas'] = "votacio";

  var xhttpvotacio = new XMLHttpRequest();
  xhttpvotacio.onreadystatechange = function () {
    var data = JSON.parse(xhttp.responseText);
    if ((data.hasOwnProperty('Error'))) {
      document.getElementById('missatge').innerHTML = `<p>${data["Error"]}</p>`;
      if (data.hasOwnProperty('DeBug')) {
        document.getElementById('missatge').innerHTML += `<p>${data["DeBug"]}</p>`;
      }
    } else {
      location.reload();
    }
    data['pas'] = "votacio";
  }
  xhttpcheckeleccions.open('PUT', '/api/eleccions.php', true);
  xhttpcheckeleccions.send(JSON.stringify(data));
}



