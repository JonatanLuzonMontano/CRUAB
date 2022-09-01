
function obrirEleccions() {
  if (confirm("Estas segur?")) {
    var xhttpobrireleccions = new XMLHttpRequest;
    xhttpobrireleccions.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttpobrireleccions.open('PUT', '/api/eleccions.php?opcio=obrireleccions', true);
    xhttpobrireleccions.send();
  }
}

function obrirLlistes() {
  if (confirm("Estas segur?")) {
    var xhttpobrirllistes = new XMLHttpRequest;
    xhttpobrirllistes.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttpobrirllistes.open('PUT', '/api/eleccions.php?opcio=obrirllistes', true);
    xhttpobrirllistes.send();
  }
}

function obrirVotacio() {
  if (confirm("Estas segur?")) {
    var xhttpobrirvotacio = new XMLHttpRequest;
    xhttpobrirvotacio.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttpobrirvotacio.open('PUT', '/api/eleccions.php?opcio=obrirvotacio', true);
    xhttpobrirvotacio.send();
  }
}
function obrirActivacio() {
  if (confirm("Estas segur?")) {
    var xhttpobriractivacio = new XMLHttpRequest;
    xhttpobriractivacio.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttpobriractivacio.open('PUT', '/api/eleccions.php?opcio=obriractivacio', true);
    xhttpobriractivacio.send();
  }
}
//#####################################   TANCAR   ##################################################

function tancarEleccions() {
  if (confirm("Estas segur?")) {
    var xhttptancareleccions = new XMLHttpRequest;
    xhttptancareleccions.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttptancareleccions.open('PUT', '/api/eleccions.php?opcio=tancareleccions', true);
    xhttptancareleccions.send();
  }
}

function tancarLlistes() {
  if (confirm("Estas segur?")) {
    var xhttptancarllistes = new XMLHttpRequest;
    xhttptancarllistes.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttptancarllistes.open('PUT', '/api/eleccions.php?opcio=tancarllistes', true);
    xhttptancarllistes.send();
  }
}

function tancarVotacio() {
  if (confirm("Estas segur?")) {
    var xhttptancarvotacio = new XMLHttpRequest;
    xhttptancarvotacio.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttptancarvotacio.open('PUT', '/api/eleccions.php?opcio=tancarvotacio', true);
    xhttptancarvotacio.send();
  }
}

function tancarActivacio() {
  if (confirm("Estas segur?")) {
    var xhttptancaractivacio = new XMLHttpRequest;
    xhttptancaractivacio.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttptancaractivacio.open('PUT', '/api/eleccions.php?opcio=tancaractivacio', true);
    xhttptancaractivacio.send();
  }
}





