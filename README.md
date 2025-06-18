# Movie Watchlist App 🎬

A simple web app that lets users search for movies using the [OMDb API](http://www.omdbapi.com/), add them to a personal watchlist, and store that list using local storage. 

## Demo
Checkout the Live Demo On Netlify: [Movie Watchlist](https://movie-watchlist-nlc.netlify.app/)
## Features

* 🔍 **Movie Search** — Search for movies by title using the OMDb API
* ➕ **Add to Watchlist** — Add movies to your watchlist with one click
* 📂 **Persistent Storage** — Watchlist data is saved to localStorage
* 📄 **Separate Pages** —

  * `index.html` for searching
  * `watchlist.html` for viewing your saved movies

## Pages

### `index.html`

* The main landing page and search interface.
* Users can enter a movie title, triggering a call to the OMDb API.
* Results are displayed with basic movie info.
* Each result has a **"Add to Watchlist"** button which stores the selected movie in `localStorage`.

### `watchlist.html`

* Displays all saved movies from localStorage.
* Watchlist persists across sessions.
* Users can remove movies as needed

## Tech Stack

* HTML, CSS, JavaScript
* OMDb API
* LocalStorage

## Getting Started

1. Clone this repo
2. Open `index.html` in your browser
3. Search for movies and add them to your watchlist
4. Open `watchlist.html` to view saved movies

## API Reference

Using the OMDb API:

```
http://www.omdbapi.com/?apikey=YOUR_API_KEY&t=movieTitle
```

## Notes

* Be sure to insert your own OMDb API key in the fetch request.
* App runs entirely in the browser — no server or backend required.


