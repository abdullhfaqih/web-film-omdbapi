const searchButton = document.querySelector(".search-button");

// KETIKA TOMBOL SEARCH DI KLIK
searchButton.addEventListener("click", async function () {
  const inputKeyWord = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyWord.value);
  updateUI(movies);
});

function getMovies(keyWord) {
  return fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=af905206&s=${keyWord}`
  )
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch(`http://www.omdbapi.com/?i=${imdbid}&apikey=af905206`)
    .then((m) => m.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showMovieDetails(m) {
  return `
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title}</h4></li>
                    <li class="list-group-item">
                      <strong>Director : </strong> ${m.Director}
                    </li>
                    <li class="list-group-item">
                      <strong>Actors : </strong> ${m.Actors} 
                    </li>
                    <li class="list-group-item">
                      <strong>Writer : </strong> ${m.Writer}
                    </li>
                    <li class="list-group-item">
                      <strong>Plot : </strong><br />${m.Plot}
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                ${m.Year}
              </h6>
              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Shows details</a>
            </div>
          </div>
        </div>`;
}
