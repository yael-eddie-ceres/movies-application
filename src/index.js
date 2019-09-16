/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

let cardData = "";
let movieData = "";
let moviesCounter = 0;

// get movies function
getMovies().then((movies) => {
  console.log('Here are all the movies:');

  // fetch movie data
  fetch('../api/movies');
  movies.forEach(({title, rating, id}, i) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    movieData += `<p>id#${id} - ${title} - rating: ${rating} - <a onClick="removeMovie(${id})">DELETE</a></p>`;

    // Increment counter
    moviesCounter++;

    console.log(moviesCounter);

    // Add data to cards on page load

    if (moviesCounter === 1) {
      cardData += `<div class="card-row">`
      cardData += `<div class="card">`
      cardData += `<h3 class="card-title">${title}</h3>`
      cardData += `<h2 class="card-rating">${rating}</h2>`
      cardData += `<div class="card-btns">`
      cardData += `<i onclick="editMovie(${id})" class="fas fa-edit"></i>`
      cardData += `<i onclick="removeMovie(${id})" class="fas fa-times-circle"></i>`
      cardData += `</div>`
      cardData += `</div>`
    } else if (moviesCounter === 3) {
      cardData += `<div class="card">`
      cardData += `<h3 class="card-title">${title}</h3>`
      cardData += `<h2 class="card-rating">${rating}</h2>`
      cardData += `<div class="card-btns">`
      cardData += `<i onclick="editMovie(${id})" class="fas fa-edit"></i>`
      cardData += `<i onclick="removeMovie(${id})" class="fas fa-times-circle"></i>`
      cardData += `</div>`
      cardData += `</div>`
      cardData += `</div>`
      moviesCounter = 0;
    } else {
      cardData += `<div class="card">`
      cardData += `<h3 class="card-title">${title}</h3>`
      cardData += `<h2 class="card-rating">${rating}</h2>`
      cardData += `<div class="card-btns">`
      cardData += `<i onclick="editMovie(${id})" class="fas fa-edit"></i>`
      cardData += `<i onclick="removeMovie(${id})" class="fas fa-times-circle"></i>`
      cardData += `</div>`
      cardData += `</div>`
    }

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
}).then(() => {
  // remove spinner and replace it with content after everything is done loading (or failing)
  loading.style.display = "none";
  container.style.display = "block";

  // print movie data string to page
  // test.innerHTML = movieData;    // for toubleshooting
  cards.innerHTML = cardData;
});