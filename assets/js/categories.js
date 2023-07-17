const searchForm = $('form');
const searchButton = $('#search-button')
const usernameInput = $('#username-input')
const gameTitleInput = $('#search-input')
const viewHistoryEl = $('#game-title-history')
const gameDisplayEl = $('.game-display')
let username
let gameTitle
const searchHistory = []
let gameDescription
 


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
  gameDisplayEl.attr('style', 'display: none;')
  $('.h2').attr('style', 'display: none;')
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
  var titleHistoryUl = $('<ul>');
  searchForm.append(titleHistoryUl);
  for (i = 0; i < 5; i++) {
    // var titleHistory = $(
    //   `<p>${searchHistory[i].gameTitle}</p>`
    //   )

    var titleHistory = $(`<li class="d-block"></li>`);
    titleHistory.text(searchHistory[i].gameTitle + " ");
    console.log(titleHistory)
    titleHistoryUl.append(titleHistory);
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
  displayGameCards('games', gameTitle);
})



// save search to search history
function saveToStorage(searchArr) {
  searchHistory.unshift(searchArr);
  var searchHistoryJSON = JSON.stringify(searchHistory);
  localStorage.setItem('Search History:', searchHistoryJSON);
}



// get API for game cards
// create click listener for game cards
function displayGameCards(location, query) {
  var apiUrl = `https://api.rawg.io/api/${location}?search=${query}&key=064195cded0c42f0bf353799a0914ad5`
  console.log(apiUrl)

  quickFetch(apiUrl).then( function(data){
    console.log(data);
    gameDisplayEl.text('');

    for (i = 0; i < data.results.length; i++) {

      // // quick fetch for description
      // quickFetch(`https://api.rawg.io/api/games/${data.results[i].id}?key=064195cded0c42f0bf353799a0914ad5`).then( function(data2){
      //   gameDisplayEl.children().eq(i).children().eq(2).text('hi')
      //   console.log(data2)
        

      //   createCard(data2.description.raw)

      // })

      var newCard = $(`
        <section class="item search-result">
          <img src="${data.results[i].background_image}" alt="${data.results[i].name} Image" />
          <h3>${data.results[i].name}</h3>
          <p></p>
        </section>`)
      gameDisplayEl.append(newCard);
      gameDisplayEl.attr('style', 'display: show;');
      $('.h2').attr('style', 'display: show;');

    }
  

    // click listener for cards
    gameDisplayEl.on('click', '.search-result', function() {
      var selectedCard = $(this)
      console.log(selectedCard)
      var selectedGameId = 

      // display only the card, larger
      selectedCard.attr('style', 'visibility: visible; width: 99%; position: absolute; top: 0; padding-left: 20%; padding-right: 20%;');
      selectedCard.children().eq(0).attr('style', 'width: 50%;')

      
      function getGameDescription() {
        var descriptionApi = 'https://api.rawg.io/api/games/23833?key=064195cded0c42f0bf353799a0914ad5'
        
      }
      // add description
      var newDescription = $('<p>');
      newDescription.text('Description: ' + 'Lorem ipsum .............');
      selectedCard.append(newDescription);
      
      

      function scrollTop() {
        $(this).scrollTop(0)
      }
      scrollTop();


      // // opacity layer for body
      // var layer = $('<div>');
      // $('body').append(layer);
      // layer.attr('style', 'background: white; position: absolute; top: 0; width: 10vw, height: 100vh;')

      
      // create close button
      var closeButton = $(`<img src="./assets/images/close-icon.png" />`)
      closeButton.attr('style', 'position: absolute; top: 0; right: 0; width: 60px;')
      selectedCard.append(closeButton);
      closeButton.on('click', function() {
        console.log('works');
        // $('body').removeAttr('style', 'visibility: hidden;');
        displayGameCards('games', gameTitle);
      })
  })
  })}

