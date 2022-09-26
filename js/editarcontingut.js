
function obtenirContingut() {
  var xhhtpcontingut = new XMLHttpRequest();
  xhhtpcontingut.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var articles = JSON.parse(xhhtpcontingut.responseText);
      console.table(articles);

      if ((articles.hasOwnProperty('Error'))) {
        popUp("Error. Consulta la consola per saber els detalls.");
        console.log(articles["Error"]);
        if (articles.hasOwnProperty('DeBug')) {
          console.log(articles["Debug"]);
        }
      } else {
        const contingut = document.getElementById('contingut');
        let plantillaarticle = document.getElementById('template').content.querySelector('section').cloneNode(true);
        articles.forEach(function (article) {
          plantillaarticle = document.getElementById('template').content.querySelector('section').cloneNode(true);

          contingut.appendChild(plantillaarticle);
          const articleactual = contingut.querySelector('section:last-of-type');
          articleactual.id = article.id;
          articleactual.setAttribute('new', 'no');
          articleactual.querySelector('.titol').textContent = decode(article.Titol);
          articleactual.querySelector('.text').textContent = decode(article.Text);
        });
      }
    }
  };
  xhhtpcontingut.open('GET', '/api/contingut.php', true);
  xhhtpcontingut.send();
}

function afegirBotons() {
  if (sessionStorage['juntari'] == "true") {

    const afegirboto = document.getElementById('template').content.querySelector('.afegir').cloneNode(true);
    document.getElementById('contingut').appendChild(afegirboto);
    document.querySelector('.afegir').classList.remove('hidden');
    document.querySelector('.afegir').addEventListener('click', function () {
      afegirArticle();
    });

    const events = document.querySelectorAll('.main-content section');

    events.forEach(function (event) {
      if (!event.querySelector('.botons')) {
        const botons = document.getElementById('template').content.querySelector('.botons').cloneNode(true);
        event.querySelector('.header').appendChild(botons);
        event.querySelector('.editar').classList.remove('hidden');
        event.querySelector('.editar').addEventListener('click', function () {
          editarArticle(event.id);
        });
        event.querySelector('.eliminar').classList.remove('hidden');
        event.querySelector('.eliminar').addEventListener('click', function () {
          borrarArticle(event.id);
        });
      }
    });
  }
}

function editarArticle(id) {
  let usuari = {};
  usuari['numsoci'] = sessionStorage['numsoci'];

  const article = document.getElementById(id);
  article.querySelector('.guardar').classList.remove('hidden');
  article.querySelector('.guardar').addEventListener('click', function () {
    guardarEvent(id);
  });
  article.querySelector('.cancelar').classList.remove('hidden');
  article.querySelector('.cancelar').addEventListener('click', function () {
    location.reload();
  });

  document.querySelectorAll('.editar').forEach(function (boto) {
    boto.classList.add('hidden');
  });
  const titol = article.querySelector('h2').textContent;
  const inputtitol = document.getElementById('template').content.querySelector('.titol-parent').cloneNode(true);
  const text = article.querySelector('.text').textContent;
  const textarea = document.getElementById('template').content.querySelector('.textarea').cloneNode(true);

  article.querySelector('.header').replaceChild(inputtitol, article.querySelector('.titol'));
  article.querySelector('input').value = titol;

  article.replaceChild(textarea, article.querySelector('.text'));
  article.querySelector('.textarea').value = text;
  article.querySelector('.textarea').style.width = '850px';
  article.querySelector('.textarea').style.height = '90px';
}

function guardarArticle(id) {
  if (confirm('Estas segur que vols guardar aquest event?')) {

    const event = document.getElementById(id);
    if (event.getAttribute('new') == 'no') {
      let data = {}

      data['juntari'] = sessionStorage['numsoci'];
      data['id'] = id;
      data['titol'] = event.querySelector('.titol-parent input').value;
      data['text'] = event.querySelector('.textarea').value;

      console.table(data);

      var xhttpcontingut = new XMLHttpRequest();
      xhttpcontingut.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          var response = JSON.parse(xhttpcontingut.responseText);

          if ((response.hasOwnProperty('Error'))) {
            popUp("Error. Consulta la consola per saber els detalls.");
            console.log(response["Error"]);
            if (response.hasOwnProperty('DeBug')) {
              console.log(response["Debug"]);
            }
          } else {
            location.reload();
          }
        }
      }
      xhttpcontingut.open('PUT', '/api/contingut.php', true);
      xhttpcontingut.send(JSON.stringify(data));
    } else {
      let data = {}

      data['juntari'] = sessionStorage['numsoci'];
      data['id'] = id;
      data['titol'] = event.querySelector('.titol-parent input').value;
      data['text'] = event.querySelector('.textarea').value;

      console.table(data);

      var xhttpcontingut = new XMLHttpRequest();
      xhttpcontingut.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          var response = JSON.parse(xhttpcontingut.responseText);

          if ((response.hasOwnProperty('Error'))) {
            popUp("Error. Consulta la consola per saber els detalls.");
            console.log(response["Error"]);
            if (response.hasOwnProperty('DeBug')) {
              console.log(response["Debug"]);
            }
          } else {
            location.reload();
          }
        }
      }
      xhttpcontingut.open('POST', '/api/contingut.php', true);
      xhttpcontingut.send(JSON.stringify(data));
    }
  }
}

function afegirArticle() {
  if (!document.querySelector('section[new="yes"]')) {
    document.getElementById('contingut').removeChild(document.querySelector('.afegir'));
    plantillaarticle = document.getElementById('template').content.querySelector('section').cloneNode(true);

    contingut.appendChild(plantillaarticle);

    const article = contingut.querySelector('section:last-of-type');
    article.id = document.querySelectorAll('section[id]').length + 1;
    article.setAttribute('new', 'yes');

    const inputtitol = document.getElementById('template').content.querySelector('.titol-parent').cloneNode(true);
    const textarea = document.getElementById('template').content.querySelector('.textarea').cloneNode(true);

    article.querySelector('.header').replaceChild(inputtitol, article.querySelector('.titol'));
    article.replaceChild(textarea, article.querySelector('.text'));
    article.querySelector('.textarea').style.width = '850px';
    article.querySelector('.textarea').style.height = '90px';

    afegirBotons();

    article.querySelector('.guardar').classList.remove('hidden');
    article.querySelector('.guardar').addEventListener('click', function () {
      guardarEvent(article.id);
    });
    article.querySelector('.cancelar').classList.remove('hidden');
    article.querySelector('.cancelar').addEventListener('click', function () {
      location.reload();
    });

    document.querySelectorAll('.editar').forEach(function (boto) {
      boto.classList.add('hidden');
    });
  } else {
    popUp('Ja has creat un nou article, guarda abans de crear un de nou.');
  }

}

function borrarArticle(id) {
  if (confirm('Estas segur que vols eliminar aquest event?')) {
    let data = {};

    data['id'] = id;

    var xhttpcontingut = new XMLHttpRequest();
    xhttpcontingut.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        var response = JSON.parse(xhttpcontingut.responseText);

        if ((response.hasOwnProperty('Error'))) {
          popUp("Error. Consulta la consola per saber els detalls.");
          console.log(response["Error"]);
          if (response.hasOwnProperty('DeBug')) {
            console.log(response["Debug"]);
          }
        } else {
          location.reload();
        }
      }
    }
    xhttpcontingut.open('DELETE', '/api/contingut.php', true);
    xhttpcontingut.send(JSON.stringify(data));
  }
}
