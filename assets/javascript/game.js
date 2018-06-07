// pseudo codingbased on rules of the game (Jagnoor) 
// Rules of the game 
    // You will be given a random number at the start of the game.
    //There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score.
    //You win the game by matching your total score to random number, you lose the game if your total score goes above the random number.
    //The value of each crystal is hidden from you until you click on it.
    //Each time when the game starts, the game will change the values of each crystal

// make a game with 4 crystals each genarates a randon number 
    //The random number shown at the start of the game should be between 19 - 120.
    // Each crystal should have a random hidden value between 1 - 12

//Generate a new random number to beat every time a new game starts
//Generate a new random number every time the a new game starts for the 4 crystals
//when i click a crystal it should add the previous total , untill it equals the random result 
//if the total is > random_result then display loss
//else win if its EQUAL to random number


var targetNumber = " "; // number to beat 
var wins = 0;   // tracks the number of wins 
var losses = 0; // tracks number of lossess 
var counter = 0; // 
var images = ['assets/images/S1.jpg','assets/images/S2.jpg','assets/images/S3.jpg','assets/images/S4.jpg'];


// generates a number between 19 - 120 () //
    function randomTargetNumber () {
		targetNumber = Math.floor(Math.random() * 102) + 19;  
    }

	function resetCrystals () {
		for (var i = 0; i < images.length; i++) {
			var crystal = $("<img>");
			crystal.addClass("crystal", "col s3");
			crystal.addClass("col s3");
			crystal.attr("src", images[i]);
			crystal.attr("height", "300");
			crystal.attr("value", (Math.floor(Math.random() * 12) + 1));
			$(".cards").append(crystal);
		}
	}

	function resetHTML () {
		$(".target-number").html(targetNumber);
		$(".win-lose-counter").html("<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>");
		$(".score-number").html(counter);
		$(".cards").empty();
	}

	// very painful lesson "card " is a materialize object with float on both sides. 6 hours of my life i will 
	// never get back ..... // chnaged to cards andeverything worked.....
	    
	function totalReset () {
		randomTargetNumber ();
		counter = 0;
		resetHTML ();
		resetCrystals ();
	}

// Running the game and caloing my functions

	// Inital Page Set Up , READY TO GO 
	randomTargetNumber(); // calling function to create the target number
	resetHTML (); // resetting old score with new values
	resetCrystals (); // resetting values on my crystals

	// Click Functions are soooo much FUN !!! once you figure them out... 
	function crystalClick () {		
		counter += parseInt($(this).attr("value"));   //attr returns first value of selected html element
		$(".score-number").html(counter);				//this takes the value of the counter and inserts it into score-number class
		if (counter == targetNumber) {
			wins++;
			totalReset();
		}
		else if (counter > targetNumber) {
			losses++;
			totalReset();
		};
	};


	//Throughout life cycle of the document, accounting for every single time document 
	//is dynamically changed execute crystalClick function
	
	$(document).on("click", ".crystal", crystalClick);


