import { iUrl, emptylistHtml, render, updateLocalStorage } from "./utils.js"

const list = JSON.parse(localStorage.getItem('Watchlist'))

render(emptylistHtml)

// FETCHING ONLY WHEN LIST IS TRUTHY
if(list){
    getMoviesHtml()
} 

//FETCHING AND DISPLAYING MOVIES FROM LOCALSTORAGE
function getMoviesHtml(){
    let boiler = ''
    list.map( mid => {
        console.log(mid)
        let url = iUrl(mid)
        fetch(url).then(res => res.json()).then(data => {
            return boiler += `
            <div class="movie">
                <img class="mov-pic" src="${data.Poster}" alt="movie cover">
                <div class="mov-details">
                    <h3 class="mov-title">${data.Title}</h3>
                    <p class="mov-subtitle">
                        <span>${data.Runtime}</span> 
                        <span> ${data.Genre} </span> 
                        <button class="add-btn" data-movie-id="${data.imdbID}"><img src="images/Icon-1.png" alt="">Remove</button>
                    </p>
                    <p class="mov-desc">${data.Plot}</p>
                </div>
            </div>
            <div class="divider"></div>
            `
        }).then(boiler => {render(boiler)})
    })
}

// HANDLING ADD / REMOVE BUTTON CLICK
document.addEventListener('click', e => {
    if(e.target.dataset.movieId){
    const movId = e.target.dataset.movieId
    list.splice(list.indexOf(movId),1)
    updateLocalStorage(list)
    console.log(list)
    getMoviesHtml()
    if(list.length <= 0){
        render(emptylistHtml)}
    }
})