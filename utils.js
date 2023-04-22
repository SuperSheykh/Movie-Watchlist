const myKey = 'ccae91a9' // The key should be appended to all requests
const baseUrl = 'http://www.omdbapi.com/?apikey=ccae91a9&' // API URL
const renderEl = document.getElementById('render-area')

const defaultAreaHtml = `<div class="expo"><img src="images/ExIcon.png" alt=""><h2>Start exporting</h2></div>`
const noresultHtml = `<div class="expo"><h2>Unable to find what you re looking for. Please try another search.</h2></div>`
const emptylistHtml = `<div class="expo"><h2>Your watchlist is looking a little empty...</h2>
                    <button class="add-btn"><img src="images/Icon-2.png" alt="">Let's add some movies!</button>
                    </div>`

// FUNCTION DOING SIMPLE TASKS
const sUrl = (val) => baseUrl + 's=' + val
const iUrl = (id) => baseUrl + 'i=' + id
const updateLocalStorage = (x) => localStorage.setItem('Watchlist', JSON.stringify(x))
const render = (boiler) => {renderEl.innerHTML = boiler}




export {baseUrl, renderEl, defaultAreaHtml, noresultHtml, emptylistHtml, sUrl, iUrl, updateLocalStorage, render}