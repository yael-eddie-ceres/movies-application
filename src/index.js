/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const loading = document.getElementById("loading");
const container = document.getElementById("container");
const test = document.getElementById("test");

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  fetch('../db.json');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    test.innerHTML = `<p>id#${id} - ${title} - rating: ${rating}<p>`;
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
}).then(() => {
  loading.style.display = "none";
  container.style.display = "block";
});