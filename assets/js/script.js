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

	searchApi("games","dates=2020-01-01,2023-07-17&ordering=-added")


}

// function test() {
// 	for (i = 0; i < 6; i++) {


// 		console.log("made it here")
// 		var newCard = $(`
// 		<div class="col-md-4">
// 			<div class="card mb-4">
// 				<img src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" width="300" height="500"  alt="Product 1" class="card-img-top">
// 				<div class="card-body">
// 					<h5 class="card-title">God Of War 4</h5>
// 					<p class="card-text"></p>
// 				</div>
// 			</div>
// 		</div>`);
// 		linkEl.append(newCard);
// 		console.log(newCard)
// 	}
// }
// test();


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
				<div class="col-12 col-md-4">
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


window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('carousel-button').click();
    });


