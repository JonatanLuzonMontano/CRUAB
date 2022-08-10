var xhttpmembre = new XMLHttpRequest();
xhttpmembre.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        var membre = JSON.parse(xhttpmembre.responseText);
        if(membre == null){
            window.location.href = "login.html";
        }
    }
}
xhttpmembre.open('GET', '/api/login.php', true);
xhttpmembre.send();