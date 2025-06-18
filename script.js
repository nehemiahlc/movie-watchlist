const moviesSection = document.getElementById('movies-section')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('btn-search')
const watchlistSection = document.getElementById('watchlist-section')
const watchlistLink = document.getElementById('watchlist-link')

if (searchBtn){
    searchBtn.addEventListener('click', () => {
        let input = searchInput.value
         getMovies(input)
        })
    }

document.addEventListener('DOMContentLoaded', () => {
    if (watchlistSection) {renderWatchlist()}
})    

    

function renderWatchlist() {
if (localStorage.length > 0) {
    watchlistSection.innerHTML = ''
    
    document.body.addEventListener('click', e => {
       const removeBtn = e.target.closest('.btn-remove')

       if (removeBtn){
        const movieContainer = removeBtn.closest('.movie-container')
        const titleElement = movieContainer.querySelector('.movie-title')

        if (titleElement) {
            const title = titleElement.textContent.trim()
            localStorage.removeItem(title)
            renderWatchlist()
        } else {
            console.log('No movie title found')
            
        }
            
       }
    
    })
    
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        let movieString = localStorage.getItem(key)
        let movie = (JSON.parse(movieString))

        watchlistSection.innerHTML += `
        <div class="movie-container">
         <img class='movie-img' src="${movie.img}">
         <div class="movie-contents">
             <div class="title-container ">
                 <h2 class='movie-title'>${movie.title}</h2>
                 <img class='star' id='star' src="images/star.png">
                 <p class='movie-rating'>${movie.rating}</p>
             </div>
             <div class="title-container">
                 <p class='movie-runtime'>${movie.runtime}</p>
                 <p class='movie-tags'> ${movie.genre}</p>
                 <button class='btn-remove'>
                     <img src="images/remove-icon.png">
                 </button>
                 <span>Remove</span>
             </div>
             <p class='movie-description'>${movie.plot}
             </p>
         </div>`

        }
        
       

    }   else    {
        // <!-- No data page -->
        watchlistSection.innerHTML = `
               
       <h3>Your watchlist is a little empty...</h3>
       <p class="p-container">
        <a href='index.html'>
            <img src="images/add-icon.png">
        </a>
        Lets add some movies!</p>`
    } 

}

async function getMovie(id) {
    const movieRes = await fetch(`http://www.omdbapi.com/?apikey=f034dc26&i=${id}`)
    if (!movieRes.ok){
        throw new Error(`HTTP error! status: ${movieRes.status}`);

    }
    const movieData = await movieRes.json();
    return {
        title: movieData.Title,
        rating: movieData.imdbRating,
        runtime: movieData.Runtime,
        genre: movieData.Genre,
        plot: movieData.Plot,
        img: movieData.Poster
    }
        
    }

async function getMovies(input) {
    try {
        
        const res = await fetch(`https://www.omdbapi.com/?apikey=f034dc26&s=${input}`)
        if (!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);

        }
        const data = await res.json();

        if (data.Response === 'False') {
            moviesSection.innerHTML = `
            <h2 class='watchlist'> We are unable to find what you are looking for, please try another search.</h2>
        `
        } else {
        moviesSection.innerHTML = ''
        for (let i = 0; i < data.Search.length; i++) {
            
            const movieID = data.Search[i].imdbID
            const movie = await getMovie(movieID)            
            
            moviesSection.innerHTML += `
        
            <div class="movie-container">
            <img class='movie-img' src="${movie.img}">
            <div class="movie-contents">
                <div class="title-container ">
                    <h2 class='movie-title' >${movie.title}</h2>
                    <img class='star' src="images/star.png">
                    <p class='movie-rating' >${movie.rating}</p>
                </div>
                <div class="title-container">
                    <p class='movie-runtime' >${movie.runtime}</p>
                    <p class='movie-tags' > ${movie.genre}</p>
                    <button class='btn-add'>
                        <img src="images/add-icon.png">
                    </button>
                    <span>Watchlist</span>
                </div>
                <p class='movie-description'>${movie.plot}
                </p>
            </div>
         `
        }
        moviesSection.addEventListener('click', e => {
            const addBtn = e.target.closest('.btn-add')
            const container = addBtn.closest('.movie-container')
            const movieContent = e.target.closest('.movie-contents')
   
               let movie = {
                title: container.querySelector('.movie-title').textContent,
                runtime: container.querySelector('.movie-runtime').textContent,
                rating: container.querySelector('.movie-rating').textContent,
                genre: container.querySelector('.movie-tags').textContent,
                plot: container.querySelector('.movie-description').textContent,
                img: container.querySelector('.movie-img').src
                }
                localStorage.setItem(`${movie.title}`, JSON.stringify(movie));
                           
               const newP = document.createElement('p')
               newP.classList.add('noti')
               newP.textContent = `${movie.title} was added to your watchlist!`
               movieContent.appendChild(newP)
   
               setTimeout(() => {
                   movieContent.removeChild(newP)
               }, 3000)    
        
          })
        }
      
        //title, runtime, rating, tags, movie description
      
    } catch (error) {
    console.log('Error', error )
  
    }
}






