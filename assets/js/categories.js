const searchForm = $('form');
const searchButton = $('#search-button')
const usernameInput = $('#username-input')
const gameTitleInput = $('#search-input')
const viewHistoryEl = $('#game-title-history')
const gameDisplayEl = $('.game-display')
let username
let gameTitle
const searchHistory = []
 


// Connect to server 
var searchLocation
var searchQuery
var locQueryUrl = `https://api.rawg.io/api/${searchLocation}?search=${searchQuery}&key=064195cded0c42f0bf353799a0914ad5`;



function quickFetch(url){
  return fetch(url)
  .then( function(resp) {
    return resp.json()
  })
  .then(function(data){
    return data
  })
}


// hide the games display on load
function hideGameDisplay() {
  gameDisplayEl.attr('style', 'visibility: hidden;')
}
hideGameDisplay();



// display link to see recent searches
function showHistoryLink() {
  var history = localStorage.getItem('Search History:');
  var historyParsed = JSON.parse(history);
  if ( historyParsed !== null) {

    for (i=0; i < historyParsed.length; i++) {
      searchHistory.push(historyParsed[i])
      console.log(searchHistory);
    }

    var historyLink = $('<a>')
    historyLink.text('Click here to see recent searches.').attr('style', 'display: block; text-decoration: underline;');
    searchForm.append(historyLink);
  }
}
showHistoryLink();



// click listener to view recent searches
searchForm.on('click', 'a', function(event) {
  event.preventDefault();
  for (i = 0; i < 5; i++) {
    var titleHistory = $(
      `<p>${searchHistory[i].gameTitle}</p>`
      )
    searchForm.append(titleHistory);
  }
})



// click listener for search button
searchButton.on('click', function(event) {
  event.preventDefault();
  username = usernameInput.val();
  gameTitle = gameTitleInput.val();
  var searchArr = {username, gameTitle};
  console.log(searchArr);
  gameTitleInput.val('');
  saveToStorage(searchArr);
})



// save search to search history
function saveToStorage(searchArr) {
  searchHistory.unshift(searchArr);
  var searchHistoryJSON = JSON.stringify(searchHistory);
  localStorage.setItem('Search History:', searchHistoryJSON);
}



// get API for game cards
function displayGameCards(location, query) {
  var apiUrl = `https://api.rawg.io/api/${location}?search=${query}&key=064195cded0c42f0bf353799a0914ad5`
  console.log(apiUrl)

  quickFetch(apiUrl).then( function(data){
    console.log(data);
    var newCard = $(`
      <section class="item">
        <img src="${data.results[0].background_image}" alt="Topic 1" />
        <h3>${data.results[0].name}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Modi et nulla quisquam explicabo neque cumque earum, repellendus libero, 
        labore esse cupiditate, quae dicta suscipit? Explicabo at eveniet odio ex molestiae.
        </p>
      </section>`)
    gameDisplayEl.append(newCard);
  })}


 
// displays games with mario as a search term
displayGameCards('games', 'mario')
