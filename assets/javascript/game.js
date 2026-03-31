// Crystal Skull Collector Game
// Click crystals to match the target number. Go over and you lose!

var targetNumber = 0;
var wins = 0;
var losses = 0;
var counter = 0;
var images = [
  'assets/images/S1.jpg',
  'assets/images/S2.jpg',
  'assets/images/S3.jpg',
  'assets/images/S4.jpg'
];

// Generate random target between 19 - 120
function randomTargetNumber() {
  targetNumber = Math.floor(Math.random() * 102) + 19;
}

// Build crystal card elements
function resetCrystals() {
  $(".cards").empty();
  for (var i = 0; i < images.length; i++) {
    var card = $("<div>").addClass("crystal-card");
    var crystal = $("<img>");
    crystal.addClass("crystal");
    crystal.attr("src", images[i]);
    crystal.attr("alt", "Crystal Skull " + (i + 1));
    crystal.attr("data-value", Math.floor(Math.random() * 12) + 1);
    card.append(crystal);
    $(".cards").append(card);
  }
}

// Update the dashboard display
function updateDisplay() {
  $(".target-number").text(targetNumber);
  $(".score-number").text(counter);
  $(".wins-number").text(wins);
  $(".losses-number").text(losses);
}

// Show win/lose message with animation
function showMessage(type) {
  var msg = $("#game-message");
  msg.removeClass("show win lose");

  if (type === "win") {
    msg.text("You Win! The skulls favour you.");
    msg.addClass("win");
  } else {
    msg.text("You Lose! The curse strikes.");
    msg.addClass("lose");
  }

  // Trigger reflow then show
  msg[0].offsetWidth;
  msg.addClass("show");

  setTimeout(function () {
    msg.removeClass("show");
  }, 1500);
}

// Full game reset
function totalReset() {
  randomTargetNumber();
  counter = 0;
  updateDisplay();
  resetCrystals();
}

// Create floating particles
function createParticles() {
  var container = document.getElementById("particles");
  if (!container) return;
  var colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#22c55e"];

  for (var i = 0; i < 30; i++) {
    var particle = document.createElement("div");
    particle.classList.add("particle");
    var size = Math.random() * 6 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = Math.random() * 15 + 10 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(particle);
  }
}

// Initialize
$(document).ready(function () {
  createParticles();
  randomTargetNumber();
  updateDisplay();
  resetCrystals();

  // Crystal click handler (delegated for dynamically created elements)
  $(document).on("click", ".crystal-card", function () {
    var crystal = $(this).find(".crystal");
    var value = parseInt(crystal.attr("data-value"));
    counter += value;
    updateDisplay();

    // Click animation on the card
    $(this).addClass("clicked");
    var self = this;
    setTimeout(function () {
      $(self).removeClass("clicked");
    }, 500);

    // Score pop effect
    var pop = $("<div>").addClass("score-pop").text("+" + value);
    $(this).append(pop);
    setTimeout(function () {
      pop.remove();
    }, 800);

    // Animate the score number
    $(".score-card").css("transform", "scale(1.1)");
    setTimeout(function () {
      $(".score-card").css("transform", "scale(1)");
    }, 200);

    // Check win/lose
    if (counter === targetNumber) {
      wins++;
      showMessage("win");
      setTimeout(totalReset, 1600);
    } else if (counter > targetNumber) {
      losses++;
      showMessage("lose");
      setTimeout(totalReset, 1600);
    }
  });
});
