window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
}

function trendsPage() {
  console.log("We're in TRENDS!");
}

function searchPage() {
  console.log("We're in Búsquedas!");
}

function movieDetailsPage() {
  console.log("We're in Detalles de Película!");
}

function categoriesPage() {
  console.log("We're in Categories!");
}

function homePage() {
  getTrendingMoviesPreview();
  console.log("HOME");
}
