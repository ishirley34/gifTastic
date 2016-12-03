// This is the array that holds the gif topics
var topics = ["Archer", "Harvey Birdman", "Cowboy Bebop"];

// This function will render the display every time a button is added
function displayGifInfo() {
	// This grabs the info in the button
	var topic = $(this).attr("data-name");
	$("#gifs").empty();
	// This is the API url and key
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {

    	// This creates a variable to make calling the response easier
    	var results = response.data;

    	// prints out the respose
    	console.log(response);

    	// prints out the queryURL
    	console.log(queryURL);



    	// This creates a div to hold the movie
    	for (var i = 0; i < results.length; i++) {
    		
    	
    		var gifDiv = $("<div class='gif'>");

    		// This gives the initial attribute to the image
    		gifDiv.attr("data-state", "still");

    			// This stores the rating
    		var p = $("<p>").text("Rating: " + results[i].rating);

    		// This creates and stroes the image tag
    		var gifImage = $("<img>");

    		// Sets the attribute of the image to a property pulled from the response
    		gifImage.attr("src", results[i].images.fixed_height_still.url);
    		// This gives the give a data element with the still url
    		gifImage.attr("data-still", results[i].images.fixed_height_still.url);


    		// This gives a data attribute for the animated image
    		gifImage.attr("data-animate", results[i].images.fixed_height.url);
    		// This appends the rating and the gif
    		gifDiv.append(gifImage);
    		gifDiv.append(p);

    		gifDiv.on("click", animateFunction);
    		// This takes everyting above and puts it in the html 
    		$("#gifs").prepend(gifDiv);

    	}; // closes the for loop for creating the html


    // creates the div to hold the gif

    }); // Closes the ajax function
}; // this closes the displayGifInfo function

// This function renders the buttons
function renderButtons() {
	$("#gifButtons").empty();

	// This for loop dynamically creates buttons the the topics array
	for (var i = 0; i < topics.length; i++) {
		// this creates the button tag
		var a = $("<button>");

		// adds a class to the the button
		a.addClass("giphy");

		// This adds an attribute
		a.attr("data-name", topics[i]);

		// This creates a data state of still for each gif
		a.attr("data-state", "still");

		// Adds the button text
		a.text(topics[i]);

		// This adds the button to the html
		$("#gifButtons").append(a);
	}; // closes the button for loop
	// This creates a loop to loop through the 
}; // This closes the renderButtons function


// This is the event listener for the button
$("#add-gif").on("click", function(event) {
	event.preventDefault();
	// This grabs the input
	var gifness = $("#gif-input").val().trim();

	// This empties the gifs
	


	// Adds the input to the array
	topics.push(gifness);

	// Calls the renderButton function
	renderButtons();

	// Keeps the page from refreshing when the enter key is pressed
	return false;
}); // closes the button click event listener

// Adds an event listener for the buttons
$(document).on("click", ".giphy", displayGifInfo);
renderButtons();

// This animates the gifs when they are clicked

// $(gifDiv).on("click", ".gif", function() {

function animateFunction() {
	// creates a var for the state of the gif
	var state = $(this).attr("data-state");

	// This sereies of if/else statmes changes the gif to animate depending on the current state when clicked
	if (state === "still") {
		$(this).children("img").attr("src", $(this).children("img").data("animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).children("img").attr("src", $(this).children("img").data("still"));
		$(this).attr("data-state", "still");
	}; //closes the else statment 
}; // this closes the animateFunction 