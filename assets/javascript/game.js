// Crystal Skull Collector — Game Logic
// Match the target number by clicking skulls. Exceed it and you're cursed.

var targetNumber = 0;
var wins = 0;
var losses = 0;
var counter = 0;
var gameActive = true;
var images = [
  { src: 'assets/images/S1.jpg', label: 'Skull I' },
  { src: 'assets/images/S2.jpg', label: 'Skull II' },
  { src: 'assets/images/S3.jpg', label: 'Skull III' },
  { src: 'assets/images/S4.jpg', label: 'Skull IV' }
];

// Random target between 19–120
function randomTargetNumber() {
  targetNumber = Math.floor(Math.random() * 102) + 19;
}

// Build crystal skull cards
function resetCrystals() {
  var $grid = $(".cards");
  $grid.empty();
  for (var i = 0; i < images.length; i++) {
    var value = Math.floor(Math.random() * 12) + 1;
    var card = $("<div>")
      .addClass("crystal-card")
      .attr("tabindex", "0")
      .attr("role", "button")
      .attr("aria-label", images[i].label + " — click to add points");

    var img = $("<img>")
      .addClass("crystal")
      .attr("src", images[i].src)
      .attr("alt", images[i].label)
      .attr("data-value", value);

    var label = $("<span>")
      .addClass("crystal-label")
      .text(images[i].label);

    card.append(img).append(label);
    $grid.append(card);
  }
}

// Update all dashboard numbers
function updateDisplay() {
  $(".target-number").text(targetNumber);
  $(".score-number").text(counter);
  $(".wins-number").text(wins);
  $(".losses-number").text(losses);
  updateProgress();
}

// Update progress bar
function updateProgress() {
  var pct = targetNumber > 0 ? Math.min((counter / targetNumber) * 100, 100) : 0;
  var $bar = $("#progress-bar");
  var $wrap = $(".progress-wrap");

  $bar.css("width", pct + "%");
  $("#progress-label").text(Math.round(pct) + "%");
  $wrap.attr("aria-valuenow", Math.round(pct));

  // Color states
  $bar.removeClass("danger safe");
  if (pct >= 90) {
    $bar.addClass("danger");
  } else if (pct >= 60) {
    // default gradient
  }
}

// Show win/lose message
function showMessage(type) {
  var $msg = $("#game-message");
  $msg.removeClass("show win lose");

  if (type === "win") {
    $msg.text("The skulls accept your offering!");
    $msg.addClass("win");
  } else {
    $msg.text("The curse consumes you!");
    $msg.addClass("lose");
    // Screen shake on loss
    $("body").addClass("shake");
    setTimeout(function() { $("body").removeClass("shake"); }, 400);
  }

  // Force reflow then show
  $msg[0].offsetWidth;
  $msg.addClass("show");

  setTimeout(function() {
    $msg.removeClass("show");
  }, 1800);
}

// Full reset
function totalReset() {
  gameActive = true;
  randomTargetNumber();
  counter = 0;
  updateDisplay();
  resetCrystals();
}

// Create floating ember particles
function createEmbers() {
  var container = document.getElementById("embers");
  if (!container) return;
  var colors = ["#c42a2a", "#d97706", "#b91c1c", "#92400e"];

  for (var i = 0; i < 25; i++) {
    var dot = document.createElement("div");
    dot.classList.add("ember-dot");
    var size = Math.random() * 4 + 1.5;
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.bottom = "-5%";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.boxShadow = "0 0 " + (size * 2) + "px " + dot.style.background;
    dot.style.animationDuration = (Math.random() * 12 + 8) + "s";
    dot.style.animationDelay = (Math.random() * 8) + "s";
    container.appendChild(dot);
  }
}

// Handle crystal click (or keyboard Enter/Space)
function handleCrystalActivate(cardEl) {
  if (!gameActive) return;

  var $card = $(cardEl);
  var $crystal = $card.find(".crystal");
  var value = parseInt($crystal.attr("data-value"));
  counter += value;
  updateDisplay();

  // Pulse animation
  $card.removeClass("clicked");
  cardEl.offsetWidth; // reflow
  $card.addClass("clicked");
  setTimeout(function() { $card.removeClass("clicked"); }, 500);

  // Score pop
  var $pop = $("<div>").addClass("score-pop").text("+" + value);
  $card.append($pop);
  setTimeout(function() { $pop.remove(); }, 900);

  // Bump score card
  $(".dash-score").css("transform", "scale(1.08)");
  setTimeout(function() { $(".dash-score").css("transform", "scale(1)"); }, 200);

  // Win / Lose check
  if (counter === targetNumber) {
    gameActive = false;
    wins++;
    updateDisplay();
    showMessage("win");
    setTimeout(totalReset, 2000);
  } else if (counter > targetNumber) {
    gameActive = false;
    losses++;
    updateDisplay();
    showMessage("lose");
    setTimeout(totalReset, 2000);
  }
}

// ===== Init =====
$(document).ready(function() {
  createEmbers();
  totalReset();

  // Click handler
  $(document).on("click", ".crystal-card", function() {
    handleCrystalActivate(this);
  });

  // Keyboard handler (Enter / Space on focused card)
  $(document).on("keydown", ".crystal-card", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCrystalActivate(this);
    }
  });

  // New Game button
  $("#btn-newgame").on("click", function() {
    totalReset();
  });
});
