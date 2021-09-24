class Movie {
  constructor(title, description, review) {
    this.title = title;
    this.description = description;
    this.review = review;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayMovies() {
    const movies = Store.getMovies();

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.getElementById("movie-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.description}</td>
      <td>${movie.review}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      <td><a href="#" class="btn btn-warning btn-sm edit">Edit</a></td>
    `;

    list.appendChild(row);
  }

  static deleteMovie(el) {
    if(el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    //div.className = "alert alert-${className}";
    //div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("movie-form");
    container.insertBefore(div, form);
}

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#review").value = "";
  }
}

//  /*taken from source...*/
// Store Class: Handles Storage
class Store {
  static getMovies() {
    let movies;
    if(localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(review) {
    const movies = Store.getMovies();

    movies.forEach((movie, index) => {
      if(movie.review === review) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add 
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const review = document.getElementById("review").value;

  // Validate
  if(title === "" || description === "" || review === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate movie
    const movie = new Movie(title, description, review);

    // Add Movie to UI
    UI.addMovieToList(movie);

    // Add movie to store
    Store.addMovie(movie);

    // Show success message
    UI.showAlert(alert("Movie Added"));

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove Movie
document.getElementById("movie-list").addEventListener("click", (e) => {
  // Remove movie from UI
  UI.deleteMovie(e.target);

  // Remove movie from store
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert(alert("Movie Deleted"));
});



