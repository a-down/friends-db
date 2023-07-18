var link1El = document.querySelector('#btn1');
var link2El = document.querySelector('#btn2');





function main(){

	var backImages = searchApi("games","dates=2020-01-01,2023-07-17&ordering=-added","background_images")

	console.log("background images found")
	for (var i = 0; i < 6; i++  ){
		var linkEl = document.querySelector('.card');
		if(linkEl){
			console.log("cards found")

		}
		else{
			console.log("cards not found")
		}
		
	}
}


function searchApi(main, secondary, exact) {

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

	fetch(locQueryUrl, exact)

    	.then(function (response) {
    	    return response.json();
    	})

    	.then(function (data){

			for (i = 0; i < 6; i++) {

				var newCard = $(`
				<section class="item search-result">
					<img src="${data.results[i].background_image}" alt="${data.results[i].name} Image" />
					<h3>${data.results[i].name}</h3>
					<p></p>
				</section>`)

				gameDisplayEl.append(newCard);
				
				gameDisplayEl.attr('style', 'display: show;');
				$('.h2').attr('style', 'display: show;');

			if (!data.results.length) {
				console.log('No results found!');
			}

			else {
				console.log("good to go")
			}
		}
	})
	.catch(function (err) {
		console.error(err);
});
}

main()


window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('carousel-button').click();
    });