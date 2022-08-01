var xhttpjunta = new XMLHttpRequest();
xhttpjunta.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        var junta = JSON.parse(xhttpjunta.responseText);
        console.log(junta);
        if(junta == null){
            window.location.href = "http://www.cruab.local/login.html";
        } else {
            if(!(junta.hasOwnProperty('juntari') && junta['juntari'] == true)){
                window.location.href = "http://www.cruab.local/login.html";
            }
        }
    }
}
xhttpjunta.open('GET', 'http://www.cruab.local/api/login.php', true);
xhttpjunta.send();