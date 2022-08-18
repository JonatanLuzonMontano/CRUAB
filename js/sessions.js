function logout() {
  console.log("entra logout");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.responseText);
      console.log(data);
      console.log(sessionStorage);
      sessionStorage.removeItem("numsoci");
      sessionStorage.removeItem("juntari");
      sessionStorage.clear();
      console.log(sessionStorage);
    }
  };
  xhttp.open('DELETE', '/api/login.php', true);
  xhttp.send();
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(xhttp.responseText);
    var data = JSON.parse(xhttp.responseText);
    if (data != null) {
      sessionStorage.setItem("numsoci", data["numsoci"]);
      sessionStorage.setItem("juntari", data["juntari"]);

      document.getElementById("paginacompte").classList.remove("hidden");
      document.getElementById("paginalogout").classList.remove("hidden");
      document.getElementById("paginalogout").addEventListener('click', function () { logout(); });


      if (sessionStorage.hasOwnProperty('juntari') && sessionStorage['juntari'] == 'true') {
        document.getElementById('paginagestio').classList.remove('hidden');
      }
    }else {
      logout();
      document.getElementById('paginalogin').classList.remove('hidden');
  } 
  }
};


xhttp.open('GET', '/api/login.php', true);
xhttp.send();
console.log(sessionStorage);
