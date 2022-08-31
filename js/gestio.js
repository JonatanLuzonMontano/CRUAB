
function obrirEleccions() {
  if (confirm("Estas segur?")) {
    var xhttpobrireleccions = new XMLHttpRequest;
    xhttpobrireleccions.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttpobrireleccions.open('PUT', '/api/eleccions.php', true);
    xhttpobrireleccions.send();
  }
}





