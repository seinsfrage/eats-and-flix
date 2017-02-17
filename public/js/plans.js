
$(document).ready(function() {
	var theaterAddress;


	$('.help').on('click', function(e){
		e.preventDefault();
		var helpInfo = $("<p>Please enter your city, state, zip, and the date you are wanting to make plans, and then press submit!</p>");
		$('#help').html(helpInfo);
	});
	
	$('#submit-button').on('click', function(e){
		e.preventDefault();

		$('#help').empty();
		$('#content-area').css('visibility', 'visible');
		

				//Movie Search API
			var startDate = $('#date-input').val().trim();
			var zipCode = $('#zip-input').val().trim();
			var api = 'http://data.tmsapi.com/v1.1/movies/showings?radius=10&startDate=' + startDate + '&zip=' + zipCode + '&api_key=3c7u9b4fnquyfbbkqzc2tzgj';
			
			$('#foodDisplay, #movieDisplay').css('visibility', 'visible');

			$.ajax({url: api, method: 'GET'})
				.done(function(data){
					console.log(data);
					
					var movieList = $('<ul class="panel-body list-group" id="movieList">');
					
					for (var i=0; i<data.length; i++){
						
						var rating = "Not Rated";
						
						
						if (data[i].hasOwnProperty("ratings")){
					        rating = data[i].ratings[0].code;
						}
						
						$(movieList).append('<li class="movieItem list-group-item"><h3 class="title">' + data[i].title +
											 '</h3><span class="expand">+</span>'+'<p class=rating>' + rating + 
											 '</p>' + '<section class="hide" id="movie' + i + '">');
					}
					$('#movieDisplay').html(movieList);
					
					for (var i=0; i<data.length; i++){
						var currentMovie = '#movie' + i,
							plot = data[i].shortDescription,
							website = data[i].officialUrl,
							cast = data[i].topCast,
							theaters = [];
							
						
							

						$(currentMovie).append('<h4 class="cast">Cast</h4><ul class="cast-members">');

						for (var castMember in cast){
							$(currentMovie + ' .cast-members').append('<li class="actor">' + cast[castMember]);
						}
						$(currentMovie).append('<p class="plot">' + plot);
						$(currentMovie).append('<select class="form-control theaters"><option selected disabled>Choose a Theater');
						$(currentMovie).append('<button id="buy-tickets" class="btn btn-default">Buy Tickets</button><span class="unavail"></span>');

						if (data[i].officialUrl){
							$(currentMovie).append('<a class="site" target="_blank" href="' + website + '">Official Website</a>');
						}
						data[i].showtimes.forEach(function(i){
							var theaterItem = '<option data-ticket="'+ i.ticketURI +'">' + i.theatre.name;
							if (theaters.indexOf(theaterItem) == -1 ){
								theaters.push(theaterItem);
							}
							
						});

						theaters.forEach(function(i){
								$(currentMovie + ' .theaters').append(i);
						});
					}
				}); //MOVIE AJAX
		

			//Restaurant Search API
			var city = $('#city-input').val().trim(); 
			var APIkey = "AIzaSyBCgAOFFu6yhGh9uDElMFpjd5ua70ByuwI";
			var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
					+ city + "&key=" + APIkey;


			$.ajax({url: queryURL, method: 'GET'})
		 		.done(function(response) {
		     	
		     	console.log("response: "+response);
		     	var restList = $('<ul class="panel-body list-group" id="restList">');

		     	
		     	for (i=0; i<5; i++) {

					var restID = response.results[i].place_id;

		     		var detailURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="
						+ restID + "&key=" + APIkey;
						console.log("deets: "+ detailURL);
						console.log("restID: " + restID);

					$.ajax({url: detailURL, method: 'GET'})
		 			.done(function(data) {
		 				// console.log('data: '+ JSON.stringify(data, 0,2));
		 				var restName = data.result.name;
		 				var restPhone = data.result.formatted_phone_number;
						var restAddress = data.result.formatted_address;
						var restPrice = data.result.price_level;
						var restRating = data.result.rating;

		 				$(restList).append('<li class="restItem list-group-item">'
		 					+ '<h3 class="title">' + restName + '</h3>'
		 					+ '<span class="expand2">+</span>'
		 					+ '<section class="hide"><p class="address" data-addr="'+restAddress+'">Address: ' + restAddress + '</p>'
		 					+ '<p>Phone Number: ' + restPhone +'</p>'
		 					+ '<section class="hide"><p>Rating: ' + restRating + '</p>'
		 					+ '<p>Price Level: ' + restPrice + '</p>'
		 					+ '<a target="_blank" href="'+data.result.website+'">Website:</a><br>'
		 					+ '<a target="_blank" href="'+data.result.url+'">Directions:</a><br>'
		 					+ '<p>Hours: '+'<br>' 
		 						+ data.result.opening_hours.weekday_text[0]+'<br>'
		 						+ data.result.opening_hours.weekday_text[1]+'<br>'
		 						+ data.result.opening_hours.weekday_text[2]+'<br>'
		 						+ data.result.opening_hours.weekday_text[3]+'<br>'
		 						+ data.result.opening_hours.weekday_text[4]+'<br>'
		 						+ data.result.opening_hours.weekday_text[5]+'<br>'
		 						+ data.result.opening_hours.weekday_text[6]+'<br>'
		 					+'</p></section>'
		 					);
					});//end second ajax
				}//end for loop
				$('#foodDisplay').html(restList);
			});//end Ajax call	
	});
});

$(document).on('click', '.expand', function(){
	var clickedMovie = $(this).parent();
	$('.open').find('section').toggleClass('hide');
	$('.open').removeClass('open');
	$(clickedMovie).addClass('open');
	$(clickedMovie).find('section').toggleClass('hide');

});
$(document).on('click', '.expand2', function(){
	var clickedRestaurant = $(this).parent();
	$('.open2').find('section').toggleClass('hide');
	$('.open2').removeClass('open2');
	$(clickedRestaurant).addClass('open2');
	$(clickedRestaurant).find('section').toggleClass('hide')
	console.log($('.open2 .address').data('addr'));
});

//Buy movie tickets button
$(document).on('click', '#buy-tickets', function(){
	var ticketURL = $(this).siblings('select').children('option:selected').attr('data-ticket');
	if (ticketURL == 'undefined'){
		$(this).siblings('.unavail').html('Tickets Unavailable');
	}
	else{
		window.open(ticketURL);
	}
});


	$.ajax({url: 'http://ip-api.com/json', async: false, method: 'GET'})
			.done(function(loc){
				xlat = loc.lat;
				xlon = loc.lon;
	});

function initMap() {

		var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 20,
          center: {lat: xlat, lng: xlon}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directionsPanel'));

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

        $(document).on('change', '.theaters', function(){
        	//get theater address
        	var city = $('#city-input').val().trim(); 
        	var state = $('#state-input').val().trim();
			var APIkey = "AIzaSyBCgAOFFu6yhGh9uDElMFpjd5ua70ByuwI";
			var selectedTheater = $('.open .theaters').val().trim();
			var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+selectedTheater+"+"+
							city+state+"&key=" + APIkey;


				$.ajax({url: queryURL, method: 'GET'})
		 			.done(function(response) {
		 				theaterAddress = response.results[0].formatted_address;
		 				onChangeHandler();
		 			});
        	
        });
        $(document).on('click', '.expand2', onChangeHandler);
    }

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      	console.log('test');
        directionsService.route({
          origin: $('.open2 .address').data('addr'),
          destination: theaterAddress,
          travelMode: 'DRIVING'
        }, function(response, status) {
        	console.log(response);
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };




