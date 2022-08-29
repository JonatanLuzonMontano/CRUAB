
function obtenirLlistes() {
  const eleccions = sessionStorage.eleccions;
  if (eleccions == "false") {
    window.location.href = "index.html";
  } else {
    if (sessionStorage['numsoci'] != null) {
      // aqui una http request?
    } else {
      window.location.href = "index.html";
    }


  }
}

