const BASE_URL = 'https://webdev.alphacamp.io'
const INDEX_URL = BASE_URL + "/api/movies/"
const POSTER_URL = BASE_URL + "/posters/"

const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []

//渲染每一部電影
const dataPanel = document.querySelector('#data-panel')

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster"/>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

//監聽dataPanel
dataPanel.addEventListener('click', (event) => {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

//movie modal 針對特定電影取得專屬id後串連API
function showMovieModal(id) {
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieImage = document.querySelector('#movie-modal-image')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id)
    .then((response) => {
      const data = response.data.results
      movieTitle.innerText = data.title
      movieImage.innerHTML = `<img src='${POSTER_URL + data.image}' alt="movie-poster" class="img-fluid">`
      movieDate.innerText = 'Release date: ' + data.release_date
      movieDescription.innerHTML = data.description
    })
    .catch((err) => console.log(err))
}

//移除最愛清單
function removeFromFavorite(id){
  if ( !movies || !movies.length ) return 
  console.log(movies)
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  alert(`已移除`)
  console.log(movieIndex)
  if ( movieIndex === -1) return 
  movies.splice(movieIndex, 1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovieList(movies)
}

// 渲染清單
renderMovieList(movies)
