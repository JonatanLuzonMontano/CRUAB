
function pasEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttpcheckeleccions.responseText);
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['presentacio de llistes'] === 1) {
        alert("presentando");
        /*document.getElementById('afegirllista').classList.remove('hidden');
        document.getElementById('afegirllista').addEventListener('click', function () {
          document.getElementById('formllista').classList.remove('hidden');
        });*/
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php?opcio=passos', true);
  xhttpcheckeleccions.send();
}






/*if (eleccions == "false") {
  window.location.href = "index.html";
} else {
  if (sessionStorage['numsoci'] != null) {
    // aqui una http request?
  } else {
    window.location.href = "index.html";
  }


}*/




