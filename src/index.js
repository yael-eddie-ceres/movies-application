/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

// declare dom element variables
const loading = document.getElementById("loading");
const container = document.getElementById("container");
const test = document.getElementById("test");

// variable to store movie data
let movieData = "";
let cardData = "";




// Add movie to db
const addMovie = (name, rating) => {
  var data = JSON.stringify({
    "title": name,
    "rating": rating
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "http://localhost:3000/movies");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.16.3");
  xhr.setRequestHeader("Accept", "*/*");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "b1af016e-fc8a-4475-ada2-f774f4d6d1b4,30cc452f-72c0-4642-9c3e-1bfffdaae4bc");
  xhr.setRequestHeader("Host", "localhost:3000");
  xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
  xhr.setRequestHeader("Content-Length", "88");
  xhr.setRequestHeader("Connection", "keep-alive");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);

  getMovies();
}





// remove movie from db
const removeMovie = (id) => {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("DELETE", `http://localhost:3000/movies/${id}`);
  xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.16.3");
  xhr.setRequestHeader("Accept", "*/*");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "61abf9cb-a691-46c2-ab19-eeb996079ae9,162c3d48-e112-450b-aaa4-9c9cbaf5687f");
  xhr.setRequestHeader("Host", "localhost:3000");
  xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
  xhr.setRequestHeader("Content-Length", "");
  xhr.setRequestHeader("Connection", "keep-alive");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}





// get movies function
getMovies().then((movies) => {
  console.log('Here are all the movies:');

  // fetch movie data
  fetch('../api/movies');
  movies.forEach(({title, rating, id}, i) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    movieData += `<p>id#${id} - ${title} - rating: ${rating} - <a onClick="removeMovie(${id})">DELETE</a></p>`;

    // Add data to cards
    cardData += `<div class="card">`
    cardData += `<h3 class="card-title">${title}</h3>`
    cardData += `<h2 class="card-rating">${rating}</h2>`
    cardData += `<div class="card-btns">`
    cardData += `<i onclick="editMovie()" class="fas fa-edit"></i>`
    cardData += `<i onclick="removeMovie(${id})" class="fas fa-times-circle"></i>`
    cardData += `</div>`
    cardData += `</div>`


  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
}).then(() => {
  // remove spinner and replace it with content after everything is done loading (or failing)
  loading.style.display = "none";
  container.style.display = "block";

  // print movie data string to page
  // test.innerHTML = movieData;
  cards.innerHTML = cardData;
});