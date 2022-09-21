
if (sessionStorage["numsoci"]) {
  window.location.href = "index.html";
}

function ferLogin() {

  var data = {};

  data['email'] = document.getElementById("email").value;
  data['password'] = document.getElementById("password").value;
  console.table(data);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var data = JSON.parse(xhttp.responseText);
      //console.log(data);
      if (data.hasOwnProperty('Error')) {
        document.querySelectorAll('input:not([type="button"]').forEach(function(element){
          element.classList.add('error');
          setTimeout(() => { element.classList.remove('error'); }, 501);
        });
        document.getElementById('missatgelogin').textContent = data.Error;
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