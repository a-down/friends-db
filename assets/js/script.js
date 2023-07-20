var link1El = document.querySelector('#btn1');
var link2El = document.querySelector('#btn2');
var linkEl = $('.card-div');


if(linkEl){
	console.log("cards found")
}
else{
	console.log("cards not found")
}



function main(){

	searchApi("games","dates=2020-01-01,2023-07-20&ordering=-added")

	window.addEventListener('DOMContentLoaded', function() {
		document.getElementById('carousel-button').click();
		});
	
}


function searchApi(main, secondary) {

	var locQueryUrl = 'https://api.rawg.io/api/?key=064195cded0c42f0bf353799a0914ad5';;
	if (main) {
		locQueryUrl = 'https://api.rawg.io/api/' + main + '?key=064195cded0c42f0bf353799a0914ad5';
		if (secondary){
			locQueryUrl = locQueryUrl + "&" + secondary
		}
		else {
			locQueryUrl = locQueryUrl
		}
	}
	else{
		console.log("epic fail")
	}

	fetch(locQueryUrl)

    	.then(function (response) {
    	    return response.json();
    	})
    	.then(function (data){
			for (i = 0; i < 6; i++) {
				console.log(data)
				console.log("made it here")
				var newCard = $(`
				<div class="col-12 col-md-4 featured-card">
					<div class="card mb-4">
						<img src="${data.results[i].background_image}" alt="Product 1" class="card-img-top">
						<div class="card-body">
							<h5 class="card-title">${data.results[i].name}</h5>
							<p class="card-text"></p>
						</div>
					</div>
				</div>`)
				linkEl.append(newCard);
				console.log(newCard)
			}
			if (!data.results.length) {
				console.log('No results found!');
			}
			else {
				console.log("good to go")
			}
		})
	.catch(function (err) {
		console.error(err);
});
}

main()




var gameDisplayEl = $('.card-div');

// click listener for cards
gameDisplayEl.on('click', '.featured-card', function() {
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
  

  function addGameDescriptions() {
    // quick fetch for description
    quickFetch(`https://api.rawg.io/api/games/${selectedGameId}?key=064195cded0c42f0bf353799a0914ad5`).then( function(data){
      // console.log(data)
      // removes previous description
      selectedCard.children().eq(4).remove();
      var newDescription = $('<p>');
      newDescription.text(data.description_raw);
      // selectedCard.children().eq(2).after(newDescription);
      selectedCard.append(newDescription);

      // scrolls to top to view card
      scrollTop();
  })}
  addGameDescriptions()

  
  // scroll to top of displayed card (called after adding description to game card)
  function scrollTop() {
    $(this).scrollTop(0)
  }
  })