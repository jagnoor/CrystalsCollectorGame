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
//when i click a crustal it should add the previous total , untill it equals the random result 
//if the total is > random_result then display loss
//else win if its EQUAL to random number


var targetNumber = ""; // number to beat 
var wins = 0;   // tracks the number of wins 
var losses = 0; // tracks number of lossess 
var counter = 0; // 



    function randomTargetNumber () {
		targetNumber = Math.floor(Math.random() * 102) + 19;  // generates a number between 19 - 120 () //
    }

    
    function totalReset () {
		targetNumber_tobeat ();
		counter = 0;
		resetHTML ();
		resetCrystals ();
    }
    

    function resetCrystals () {
		
			var crystal ;
			crystal.attr("value", (Math.floor(Math.random() * 12) + 1));
			$(".card").append(crystal);
		
	}










    //

    // Institute Variables

var targetNumber = "";
var wins = 0;
var losses = 0;
var counter = 0;
var images = ["./assets/images/Crystal-Blue.png", "./assets/images/Crystal-Purple.png", "./assets/images/Crystal-Red.png", "./assets/images/Crystal-Yellow.png"];

// Functions

	function randomTargetNumber () {
		targetNumber = Math.floor(Math.random() * 102) + 19;
	}

	function resetCrystals () {
		for (var i = 0; i < images.length; i++) {
			var crystal = $("<img>");
			crystal.addClass("crystal");
			crystal.attr("src", images[i]);
			crystal.attr("value", (Math.floor(Math.random() * 12) + 1));
			crystal.attr("height", "100");
			$(".crystal-images").append(crystal);
		}
	}

	function resetHTML () {
		$(".target-number").html(targetNumber);
		$(".win-lose-counter").html("<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>");
		$(".score-number").html(counter);
		$(".crystal-images").empty();
	}

	function totalReset () {
		randomTargetNumber ();
		counter = 0;
		resetHTML ();
		resetCrystals ();
	}

// Running Code

	// Inital Page Set Up
	randomTargetNumber();
	resetHTML ();
	resetCrystals ();

// Click Functions
	function crystalClick () {
		//attr returns first value of selected html element
		counter += parseInt($(this).attr("value"));
		$(".score-number").html(counter);
		if (counter == targetNumber) {
			wins++;
			totalReset();
		}
		else if (counter > targetNumber) {
			losses++;
			totalReset();
		};
	};

	//Throughout life cycle of the document, accounting for every single time document is dynamically changed execute crystalClick function
	$(document).on("click", ".crystal", crystalClick);