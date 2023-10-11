const API_URL = "https://japceibal.github.io/japflix_api/movies-data.json"

let Pelis = [];
let ResultadoPelis = [];

async function getJSONData(url) {
  return await fetch(url)
    .then(response => response.json())
    .then(data => {
      Pelis = data;
    });
}

function realizarBusqueda() {
  const busquedaInput = document.getElementById("inputBuscar").value;
  ResultadoPelis = [];

  let coincideGenero = false;
  let i = 0;
  Pelis.forEach((peli) => {
    while (!(coincideGenero) && (i < peli.genres.length)){
      coincideGenero = peli.genres[i].name.includes(busquedaInput);
      i += 1;
    }
    if (peli.title.includes(busquedaInput) || coincideGenero || peli.tagline.includes(busquedaInput) || peli.overview.includes(busquedaInput)){
      ResultadoPelis.push(peli)
    }
  })
}

function showMovies(){
  let htmlToAppend = ``;
  let htmlToCanvas =``;

  ResultadoPelis.forEach((peli)=>{
    let starHtml = ``
    let starRate = peli.vote_average / 2;
    /*let genreList = ``
    peli.genres.forEach((genre)=>{
      genreList += genre.name
      if (genre.name != peli.genres[peli.genres.length - 1]){
        genreList += ' - '
      }
    })
*/
peliGenres = peli.genres.map((genre) => genre.name)
enunciadoGeneros = peliGenres.join(' - ')
    console.log(starRate)
    let f = 0;
    while ((f < 5) && (f < starRate)){
      f += 1;
    }
    if (starRate < f - .5){
      f -= 1;
    }
    for(let e = 0; e < f; e++){
      starHtml += `
      <span class="fa fa-star checked"></span>
      `;
    }
    for(let u = 0; u < 5-f; u++){
      starHtml += `
      <span class="fa fa-star"></span>
      `
    }
   
    htmlToAppend += `<li class="list-group-item text-light" meta-id="${peli.id}">
    <div class="d-flex justify-content-between">
      <strong> ${peli.title} </strong> <span class="star-rating">${starHtml}</span>
    </div>
    <span class="text-muted">${peli.tagline}</span>
  </li>`

  
  htmlToCanvas += `
  <div class="offcanvas offcanvas-top" tabindex="-1" id="${peli.id}Canvas" aria-labelledby="offcanvasTopLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">${peli.title}</h5>
    </div>
    <div class="offcanvas-body">
      <p>${peli.overview}</p>
      <br>
      <p>${enunciadoGeneros}</p>
    </div>
  </div>`
  })

  document.getElementById("lista").innerHTML = htmlToAppend;
  console.log(document.querySelectorAll(".list-group-item.text-light"))
  document.querySelectorAll(".list-group-item.text-light").forEach((element)=>{
    element.addEventListener('click', ()=>{
      console.log(element.id)
    })
  })
}

document.addEventListener('DOMContentLoaded', async function() {
  await getJSONData(API_URL);

  document.getElementById("btnBuscar").addEventListener("click", function() {
    realizarBusqueda();
    showMovies();
  })
})




