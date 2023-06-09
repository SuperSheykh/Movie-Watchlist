import {renderEl, myWatchlist,defaultAreaHtml, noresultHtml,sUrl, iUrl, updateLocalStorage, render } from "./utils.js"
const searchIpt = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')


// DEFAULT SETTINGS AND RENDERING
updateLocalStorage(myWatchlist)
render(defaultAreaHtml)

// THE SEARCH FUNCTION FETCHING AND DISPLAYING RESULTS
searchBtn.addEventListener('click', (e) =>  {
    e.preventDefault()
    let searchHtml = ''
    let url = sUrl(searchIpt.value)
    
    fetch(url).then(res => res.json())
    .then(data => data.Search)
    .then(movies => {
        // console.log(movies)
        movies.map((movie)=> {
            // console.log(movie.Title)

            let url = iUrl(movie.imdbID)
            fetch(url).then(res => res.json()).then(data => {
                // console.log(data.Plot)

                return searchHtml += ` 
                <div class="movie">
                    <img class="mov-pic" src="${data.Poster}" alt="movie cover">
                    <div class="mov-details">
                        <h3 class="mov-title">${data.Title}</h3>
                        <p class="mov-subtitle">
                            <span>${data.Runtime}</span> 
                            <span> ${data.Genre} </span> 
                            <button class="add-btn" data-movie-id="${data.imdbID}"><img src=${myWatchlist.includes(data.imdbID)? '"images/Icon-1.png" alt="">Remove':'"images/Icon-2.png" alt="">Watchlist'}</button>
                        </p>
                        <p class="mov-desc">${data.Plot}</p>
                    </div>
                </div>
                <div class="divider"></div>
                `
            
            }).then(sHtml => { render(sHtml) })

        })
    })
    

})

// HANDLING ADD / REMOVE BUTTON CLICK
document.addEventListener('click', e => {
    if(e.target.dataset.movieId){
        console.log(e.target)
        const movId = e.target.dataset.movieId
        if(!myWatchlist.includes(movId)){
            e.target.innerHTML = `<img src="./images/icon-1.png" alt=""/>Remove`
            myWatchlist.push(movId)
        } else {
            e.target.innerHTML = `<img src="./images/icon-2.png" alt=""/>Watchlist`
            myWatchlist.splice(myWatchlist.indexOf(movId),1)
        }
        updateLocalStorage(myWatchlist)
    }
})


