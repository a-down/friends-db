var link1El = document.querySelector('#btn1');
var link2El = document.querySelector('#btn2');
var link3El = document.querySelector('#btn3');


function main(){

	searchApi("games")

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
    		console.log(data)
			console.log(data.results[0].rating);
			if (!data.results.length) {
				console.log('No results found!');
			} 
			else {
				for (var i = 0; i < data.results.length; i++) {
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
