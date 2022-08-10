
if(sessionStorage["numsoci"]){
    window.location.href = "index.html";
}

function ferLogin(){

    var data = {};

    data['email'] = document.getElementById("email").value;
    data['password'] = document.getElementById("password").value;
    
    var xhttp = new XMLHttpRequest();;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var data = JSON.parse(xhttp.responseText);
            if((data.hasOwnProperty('Error'))){
                document.getElementById('missatgelogin').innerHTML = `<p>${data["Error"]}</p>`;
            } else {
                sessionStorage.setItem("numsoci", data["numsoci"]);
                sessionStorage.setItem("juntari", data["juntari"]);
                window.location.href = "index.html";
            }
        }
    };

    xhttp.open('POST', '/api/login.php', true);
    xhttp.send(JSON.stringify(data));
}