var xhttpjunta = new XMLHttpRequest();
xhttpjunta.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        var junta = JSON.parse(xhttpjunta.responseText);
        //console.log(junta);
        if(junta == null){
            window.location.href = "login.html";
        } else {
            if(!(junta.hasOwnProperty('juntari') && junta['juntari'] == true)){
                window.location.href = "login.html";
            }
        }
    }
}
xhttpjunta.open('GET', '/api/login.php', true);
xhttpjunta.send();