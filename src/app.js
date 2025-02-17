// Define vars for title, rating, saveBtn DOM elements.
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const saveBtn = document.getElementById("saveBtn");

let movieData = "";
let movieDataRaw = ""; // is updated by getMovies() in index.js

// Updates movie list on page
const updateMovies = () => {
    console.log("updateMovie function was ran");
    fetch('api/movies')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let moviesCounter = 0;
            response.forEach(({title, rating, id}) => {
                console.log(`id# ${id} - ${title} - rating: ${rating}`);
                movieData += `<p>id#${id} - ${title} - rating: ${rating} - <a onClick="removeMovie(${id})">DELETE</a></p>`;

                // Increment counter
                moviesCounter++;

                // console.log(moviesCounter); // used for troubleshooting

                // Add data to cards
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
        })
        .then(() => {
            // test.innerHTML = movieData;
            cards.innerHTML = cardData;
        });
    };


// Add movie to db
const addMovie = (name, ratingScore) => {
    console.log("addMovie function was ran");
    // If there are empty arguments, get the values from the form.
    if (name === undefined || ratingScore === undefined) {
        var data = JSON.stringify({
            "title": title.value,
            "rating": rating.value
        });
    } else {
        var data = JSON.stringify({
            "title": name,
            "rating": rating
        });
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:3000/movies");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "b1af016e-fc8a-4475-ada2-f774f4d6d1b4,30cc452f-72c0-4642-9c3e-1bfffdaae4bc");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    // Clear page of all data before we get new data
    cards.innerHTML = "";
    movieData = "";
    cardData = "";

    // Need a way to refresh the page after click
    setTimeout(updateMovies, 200);

    // Get movie poster and add to background of page
    fetchMovie(title.value);
    setTimeout(() => {
        bgDiv.setAttribute("style", "background-image: url('" + users.Poster +"')")
    }, 800);
}

// Function used for editing movie
const editUpdateMovie = (idx) => {
    console.log("editUpdateMovie function was ran");
    var data = JSON.stringify({
        "title": modalTitle.value,
        "rating": modalRating.value,
        "id": movieDataRaw[idx].id
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", `http://localhost:3000/movies/${movieDataRaw[idx].id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "0d67ca2f-9336-4115-91c6-cdcb1faa7f64,e40af0a8-f85c-4d89-875f-2e4b1d42ec7a");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    // Need a way to refresh the page after click
    setTimeout(updateMovies, 800);
}

// Store selected index
let selectedIndex = 0;

// Function for displaying movie to edit
const editMovie = (id) => {
    console.log("editMovie function was ran");
    console.log("You want to edit movie " + id + " ?");

    // retrieved movie data and saved it to var: movieDataRaw
    fetch('api/movies')
        .then(response => response.json())
        .then(response => {
            movieDataRaw = response;
            console.log(response);

            // get index from id
            movieDataRaw.map((e, i) => {
                (e.id === id) ? selectedIndex = i : "";
            });

            console.log("selected index is " + selectedIndex);

            modalTitle.value = movieDataRaw[selectedIndex].title;
            modalRating.value = movieDataRaw[selectedIndex].rating;
        });

    // delay showing modal
    setTimeout(() => {
        modal.style.display = "block"
    }, 500);

    // Add event listener for save Btn
    saveBtn.addEventListener("click", () => {
        cards.innerHTML = "";
        movieData = "";
        cardData = "";
        modal.style.display = "none";
        editUpdateMovie(selectedIndex);
    });
};

// Remove movie from db
const removeMovie = (id) => {
    console.log("removeMovie function was ran");
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        console.log(this.responseText);
        }
    });

    xhr.open("DELETE", `http://localhost:3000/movies/${id}`);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "61abf9cb-a691-46c2-ab19-eeb996079ae9,162c3d48-e112-450b-aaa4-9c9cbaf5687f");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    // Clear page of all data before we get new data
    cards.innerHTML = "";
    movieData = "";
    cardData = "";

    // Need a way to refresh the page after click
    setTimeout(updateMovies, 800);
}

// movie poster fun fun fun fun
const poster = document.getElementById("poster");
let button = document.getElementById("btn");

let users = "";
let inputTitle = "";

// fetches movie information stores in var: users
const fetchMovie = (title) => {
    console.log("fetchMovie function was ran");
    if (title !== undefined) {
        inputTitle = document.getElementById("title").value;
        fetch(`http://www.omdbapi.com/?t=${title}&apikey=db1cd656`)
            .then((response) => response.json())
            .then((json) => {
                users = json;
                console.log(json)
            });
    } else {
        inputTitle = document.getElementById("input").value;
        title = inputTitle;
        fetch(`http://www.omdbapi.com/?t=${title}&apikey=db1cd656`)
            .then((response) => response.json())
            .then((json) => {
                users = json;
                console.log(json)
                console.log(users.Poster);
                setTimeout(() => {
                    poster.src = users.Poster;
                }, 1200)
            });
    }
};

// Javascript for Modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Define DOM variables for modal elements
const modalTitle = document.getElementById("modal-title");
const modalRating = document.getElementById("modal-rating");