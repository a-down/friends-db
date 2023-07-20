// global variables
const searchForm = $('form');
const searchButton = $('#search-button')
const usernameInput = $('#username-input')
const gameTitleInput = $('#search-input')
const viewHistoryEl = $('#game-title-history')
const gameDisplayEl = $('#game-display')
let username
let gameTitle
const searchHistory = []



// quickFetch to be called throughout
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



// display link to see recent searches if recent searches have been made
function showHistoryLink() {
  var history = localStorage.getItem('Search History:');
  var historyParsed = JSON.parse(history);
  if ( historyParsed !== null) {

    for (i=0; i < historyParsed.length; i++) {
      searchHistory.push(historyParsed[i])
      // console.log(searchHistory);
    }

    var historyLink = $(`<a class="col-12 view-history-link text-center">Click here to see recent searches.</a>`)
    historyLink.attr('style', 'display: block; text-decoration: underline;');
    searchForm.append(historyLink);
  }
}
showHistoryLink();



// click listener to view recent searches
searchForm.on('click', '.view-history-link', function(event) {
  event.preventDefault();
  // removed search history link
  searchForm.children().eq(2).remove();
  var titleHistoryUl = $(`<ul class"row col-12"></ul>`);
  searchForm.append(titleHistoryUl);
  for (i = 0; i < 5; i++) {
    var titleHistory = $(`<a class="col-12 d-block title-history"></a>`);
    titleHistory.text(searchHistory[i].gameTitle + " ");
    // console.log(titleHistory)
    titleHistoryUl.append(titleHistory);
  }
  searchForm.on('click', '.title-history', function(event) {
    event.preventDefault();
    gameTitle = $(this).text();
    displayGameCards('games', $(this).text())
  })
})



// click listener for search button
searchButton.on('click', function(event) {
  event.preventDefault();
  username = usernameInput.val();
  gameTitle = gameTitleInput.val();
  var searchArr = {username, gameTitle};
  // console.log(searchArr);
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
      var newCard = $(`
        <section class="item search-result" role="listitem" tabindex="0">
          <img src="${data.results[i].background_image}" alt="${data.results[i].name} Image" />
          <h3>${data.results[i].name}</h3>
          <p style="display: none;">${data.results[i].id}</p>
        </section>`)
      gameDisplayEl.append(newCard);
      newCard.children().eq(2).attr('style', 'display: none;')
      gameDisplayEl.attr('style', 'display: show;');
      $('.h2').attr('style', 'display: show;');
      // console.log(newCard.children().eq(2).text())
}
      // console.log('done');
})}




// click listener for cards
gameDisplayEl.on('click', '.search-result', function() {
  var selectedCard = $(this)
  // console.log(selectedCard)
  var selectedGameId = selectedCard.children().eq(2).text()
  // console.log(selectedGameId)

  // display only the card larger and at the top of screen
  selectedCard.attr('style', 'visibility: visible; width: 99%; position: absolute; top: 0; padding-left: 20%; padding-right: 20%;');
  selectedCard.children().eq(0).attr('style', 'width: 50%;')


  // create close button
  var closeButton = $(`<img src="./assets/images/close-icon.png" class='close-button'/>`)
  closeButton.attr('style', 'position: absolute; top: 0; right: 0; width: 64px; margin: 10px;')
  selectedCard.append(closeButton);


  // close button click listener
  closeButton.on('click', function() {
    // console.log('works');
    displayGameCards('games', gameTitle);
  })
  
  selectedCard.children('.deletable').remove()

  function addGameDescriptions() {
    // quick fetch for description
    quickFetch(`https://api.rawg.io/api/games/${selectedGameId}?key=064195cded0c42f0bf353799a0914ad5`).then( function(data){
      console.log(data)
      // removes previous description and rating
      // selectedCard.children('.deletable').remove()

      var newRating = $(`
        <p class="deletable">Rating: ${data.rating}/5</p>
      `)
      selectedCard.append(newRating)

      var newDescription = $(`<p class="deletable"></p>`);
      newDescription.text(data.description_raw);
      selectedCard.append(newDescription);

      console.log(selectedCard.children().eq(4))
      console.log(selectedCard.children().eq(5))

    
      // scrolls to top to view card
      scrollTop();
  })}
  addGameDescriptions()

  
  // scroll to top of displayed card (called after adding description to game card)
  function scrollTop() {
    $(this).scrollTop(0)
  }
  })