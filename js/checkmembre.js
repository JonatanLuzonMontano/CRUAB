var xhttpmembre = new XMLHttpRequest();
xhttpmembre.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        var membre = JSON.parse(xhttpmembre.responseText);
        if(membre == null){
            window.location.href = "http://www.cruab.local/login.html";
        }
    }
}
xhttpmembre.open('GET', 'http://www.cruab.local/api/login.php', true);
xhttpmembre.send();