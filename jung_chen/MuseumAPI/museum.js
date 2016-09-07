$('form').on('submit', makerSearch);

function makerSearch(data) {
	// PREVENT THE DEFAULT BEHAVIOOR OF THE DATA
	data.preventDefault();

	// SERIALIZE THE ARRAY & GET THE VALUE
	var input = $(this).serializeArray()[0].value

	// SPLIT AND JOIN THE INFO
	var searchInput = input.split(' ').join('-');
	// console.log(input)
	var form = $("#selected").val()

	//--- NOW, WE MAKE OUR AJAX CALL ---
	var key = "6d1qQgME"
	$.ajax({		
		url: "https://www.rijksmuseum.nl/api/en/collection?key=" +key+ 
				"&format=json" +form+ +searchInput,
		success: getWorks
	})

	// OUTSIDE THE AJAX CALL #1, WE PERFORM THE CALLBACK FUNCTION UPON SUCCESS OF INFORMATION RETREIVAL
	function getWorks(data) {
	$('ul').empty();
	console.log(data);
	for(var i=0; i<data.artObjects.length; i++){
	var imagesLink = data.artObjects[i].webImage.url;
	var images= document.createElement('img')
          images.setAttribute("src", imagesLink)
          $('ul').append(images)
		}
	}
}