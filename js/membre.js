function actiuInactiu() {
  const nummembre = sessionStorage.getItem("numsoci");
  var xhttpactiu = new XMLHttpRequest();
  xhttpactiu.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttpactiu.responseText);
      //console.log(data);
      for(i = 0; i < data.length; i++) {
        if (data[i]["numsoci"] == nummembre) {
          document.getElementById('activitat').textContent = "Ets un usuari " + data[i]['estat'] + ".";
          break;
        }
      }
    }
  }
  xhttpactiu.open('GET', '/api/registre.php?tipus=actiusono', true);
  xhttpactiu.send();
}