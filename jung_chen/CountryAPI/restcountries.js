$('form').on('submit', countrySearch);

function countrySearch(data) {
	// PREVENT THE DEFAULT BEHAVIOOR OF THE DATA
	data.preventDefault();

	// SERIALIZE THE ARRAY & GET THE VALUE
	var input = $(this).serializeArray()[0].value

	// SPLIT AND JOIN THE INFO
	var countryName = input.split(' ').join('%20');
	// console.log(input)


	//--- NOW, WE MAKE OUR AJAX CALL ---
	$.ajax({
		url: "https://restcountries.eu/rest/v1/name/" + countryName + "?fullText=true",
		success: getCurrency
	})

	// OUTSIDE THE AJAX CALL #1, WE PERFORM THE CALLBACK FUNCTION UPON SUCCESS OF INFORMATION RETREIVAL
	function getCurrency(data) {
		
		// NOW WERE. TAKING OUR DATA FROM THE CONSOLE, AND CONVERTING IT TO A STRING
		var currency = (data[0].currencies).toString();

		// CONSOLE.LOG IT TO TEST IT OUT SO THAT IT PRINTS IN STRING FORMAT
		// console.log(currency)

	// --- OKAY- NOW, OUR AJAX CALL #1 IS A SUCCESS --- 

	
	// NOW, WE PERFORM OUR SECOND AJAX CALL TO FILTER OUT EVERY COUNTRY THAT USES THAT PARTICULAR CURRENCY
	$.ajax({
		url: "https://restcountries.eu/rest/v1/currency/" + currency,
		success: displayCountries
	})

	// OUTSIDE THIS AJAX CALL, WE PERFORM THE FUNCTION THAT IS GOING TO CALL EVERY COUNTRY BASED ON 
	// THE CURRENCY ENTERED
	function displayCountries(countries) {
		$('li').remove()
		for(i=0; i < countries.length; i++) {
			// console.log(countries[i].name)
		  var country= document.createElement('li')
          country.innerHTML = countries[i].name
          $('ul').append(country)
		}




	}// END DISPLAY-COUNTRIES


