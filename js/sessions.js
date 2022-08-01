function logout(){
    console.log("entra logout");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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
    xhttp.open('DELETE', 'http://www.cruab.local/api/login.php', true);
    xhttp.send();
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);
        if(data != null){
            sessionStorage.setItem("numsoci", data["numsoci"]);
            sessionStorage.setItem("juntari", data["juntari"]);
            document.getElementById('seccions').innerHTML += `<li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="membre.html">Compte</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="" onclick="logout()">Logout</a>
                    </li>`;
            if(sessionStorage.hasOwnProperty('juntari') && sessionStorage['juntari'] == 'true'){
            document.getElementById('seccions').innerHTML += `<li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="gestio.html">Gestió</a>
                    </li>`;
}
        } else {
            logout();
            document.getElementById('seccions').innerHTML += `<li class="nav-item">
                                                                  <a class="nav-link active" aria-current="page" href="login.html">Login</a>
                                                              </li>`;
        }
    }
};

xhttp.open('GET', 'http://www.cruab.local/api/login.php', true);
xhttp.send();
console.log(sessionStorage);
