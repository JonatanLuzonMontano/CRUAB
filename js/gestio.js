
function obrirEleccions() {
  if (confirm("Estas segur?")) {
    var xhttpobrireleccions = new XMLHttpRequest;
    xhttpobrireleccions.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    data = {};
    data['opcio'] = "obrireleccions";
    xhttpobrireleccions.open('PUT', '/api/eleccions.php', true);
    xhttpobrireleccions.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "obrirllistes";
    xhttpobrirllistes.open('PUT', '/api/eleccions.php', true);
    xhttpobrirllistes.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "obrirvotacio";
    xhttpobrirvotacio.open('PUT', '/api/eleccions.php', true);
    xhttpobrirvotacio.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "obriractivacio";
    xhttpobriractivacio.open('PUT', '/api/eleccions.php', true);
    xhttpobriractivacio.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "tancareleccions";
    xhttptancareleccions.open('PUT', '/api/eleccions.php', true);
    xhttptancareleccions.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "tancarllistes";
    xhttptancarllistes.open('PUT', '/api/eleccions.php', true);
    xhttptancarllistes.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "tancarvotacio";
    xhttptancarvotacio.open('PUT', '/api/eleccions.php', true);
    xhttptancarvotacio.send(JSON.stringify(data));
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
    data = {};
    data['opcio'] = "tancaractivacio";
    xhttptancaractivacio.open('PUT', '/api/eleccions.php', true);
    xhttptancaractivacio.send(JSON.stringify(data));
  }
}





