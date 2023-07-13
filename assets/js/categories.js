const searchForm = $('form');
const searchButton = $('#search-button')
const usernameInput = $('#username-input')
const gameTitleInput = $('#search-input')
const viewHistoryEl = $('#game-title-history')
let username
let gameTitle
const searchHistory = []


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


// we should have a section for previous searches