
function pasEleccions() {
  var xhttpcheckeleccions = new XMLHttpRequest();
  xhttpcheckeleccions.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var llista = JSON.parse(xhttpcheckeleccions.responseText);
      console.log(llista);
      if (llista['proces electoral'] === 1) {
        if (llista['presentacio de llistes'] === 1) {
          document.getElementById('afegirllista').classList.remove('hidden');
          document.getElementById('afegirllista').addEventListener('click', function() {
            document.getElementById('formllista').classList.remove('hidden');
          });
        }
      } else {
        //window.location.href = "index.html";
      }
    }
  }
  xhttpcheckeleccions.open('GET', '/api/eleccions.php', true);
  xhttpcheckeleccions.send();





  /*if (eleccions == "false") {
    window.location.href = "index.html";
  } else {
    if (sessionStorage['numsoci'] != null) {
      // aqui una http request?
    } else {
      window.location.href = "index.html";
    }


  }*/

  
}

