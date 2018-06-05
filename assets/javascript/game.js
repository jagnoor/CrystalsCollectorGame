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


    var targetNumber;
    var lost;
    var win;
    var counter;



    function targetNumber_tobeat () {
		targetNumber = Math.floor(Math.random() * 102) + 19;
    }
    



    
    function totalReset () {
		targetNumber_tobeat ();
		counter = 0;
		resetHTML ();
		resetCrystals ();
    }
    




