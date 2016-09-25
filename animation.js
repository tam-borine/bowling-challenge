var game = $("#game");
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Canvas dimensions
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;


// Game settings
var playGame;
var roll;
var asteroids; // Array that holds all the asteroids
var player;
var playerSelected;
var playerMaxAbsVelocity;
var playerVelocityDampener;
var powerX;
var powerY;
var platformX;
var platformY;
var platformOuterRadius;
var platformInnerRadius;

// Game UI
var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiFrameStats = $("#frameStats");
var uiComplete = $("#gameComplete");
var uiPlay = $("#gamePlay");
var uiReset = $(".gameReset");
var uiPinsRemaining = $("#pinsRemaining");
var uiRoll = $("#frameRoll");
var uiFramePoints = $("#framePoints")

// Reset player
function resetPlayer() {
    player.x = playerOriginalX;
    player.y = playerOriginalY;
    player.vX = 0;
    player.vY = 0;
};

// Reset and start the game
function startGame() {
    // Reset game stats
    uiRoll.html("0");
    uiFrameStats.show();

    // Set up initial game settings
    roll = 0;
    asteroids = [];
    playGame = false;
    playerSelected = false;
    playerMaxAbsVelocity = 30;
    playerVelocityDampener = 0.3;
    playerOriginalX = canvasWidth/2;
    playerOriginalY = canvasHeight-150;
    powerX = -1;
    powerY = -1;
    platformX = canvasWidth/2;
    platformY = 150;
    platformOuterRadius = 100;
    platformInnerRadius = 75;

    // Set up player asteroid
    var pX = playerOriginalX;
    var pY = playerOriginalY;
    var pRadius = 15;
    var mass = 10;
    var friction = 0.97;
    player = new Asteroid(pX, pY, pRadius, mass, friction);
    player.player = true;
    asteroids.push(player);

    // Set up other asteroids
    //var outerRing = 8; // Asteroids around outer ring
    //var ringCount = 3; // Number of rings
    var nPinRows = 4;
    var distancePins = 40;
    for (var pinRow = 0; pinRow < nPinRows; ++pinRow) {
      for (var pinCol = 0; pinCol <= pinRow; ++pinCol) {
        y = platformY - pinRow*Math.sqrt(3/4)*distancePins;
        x = platformX + (-pinRow/2 + pinCol)*distancePins;
        var radius = 10;
        var mass = 5;
        var friction = 0.95;
        asteroids.push(new Asteroid(x, y, radius, mass, friction));
      }
    }

    uiPinsRemaining.html(asteroids.length-1); //remove player from Asteroid count

    // Code from Chapter 5 (Accessing pixel values)
    $(document).on('mousedown', function(e) { //when mouse is held down
        e.preventDefault();
        if (!playerSelected &&
            player.x == playerOriginalX &&
            player.y == playerOriginalY) {
            var canvasX = Math.floor(e.pageX); // position of cursor
            var canvasY = Math.floor(e.pageY);

            if (player) { //auto play
                if (!playGame) {
                    playGame = true;
                    animate();
                };

                var dX = player.x-canvasX; //get difference in position between cursor and player
                var dY = player.y-canvasY;
                var distance = Math.sqrt( (dX*dX) + (dY*dY) );
                var padding = 0;

                if (distance < player.radius+padding) {   //WHAT IS HAPPENING HERE???
                    powerX = canvasX;
                    powerY = canvasY;
                    playerSelected = true;
                };
            };
        };
    });

    $(document).on('mouseup', function(e) { //when mouse click is released
        if (playerSelected) {
            var canvasX = Math.floor(e.pageX);
            var canvasY = Math.floor(e.pageY);

            if (player) {
                var dX = canvasX-player.x;
                var dY = canvasY-player.y;
                var distance = Math.sqrt((dX*dX)+(dY*dY)); //a

                if (distance*playerVelocityDampener < playerMaxAbsVelocity) {
                    player.vX = -(dX*playerVelocityDampener);
                    player.vY = -(dY*playerVelocityDampener);
                } else {
                    var ratio = playerMaxAbsVelocity / (distance*playerVelocityDampener);
                    player.vX = -((dX*ratio)*playerVelocityDampener);
                    player.vY = -((dY*ratio)*playerVelocityDampener);
                };

                uiRoll.html(++roll);
            };
        };

        playerSelected = false;
        powerX = -1;
        powerY = -1;
    });

    $(document).on('mousemove', function(e) {
        if (playerSelected) { //boolean to track whether mouse is held down on player object
            var canvasX = Math.floor(e.pageX);
            var canvasY = Math.floor(e.pageY);

            if (player) {
                var dX = canvasX-player.x;
                var dY = canvasY-player.y;
                var distance = Math.sqrt( (dX*dX) + (dY*dY) );

                if (distance * playerVelocityDampener < playerMaxAbsVelocity) {
                    powerX = canvasX;
                    powerY = canvasY;
                } else {
                    var ratio = playerMaxAbsVelocity/(distance*playerVelocityDampener);
                    powerX = player.x + (dX*ratio);
                    powerY = player.y + (dY*ratio);
                }
            }
        }
    });

    // Start the animation loop
    animate();
};

// Inititialise the game environment
function init() {
    uiFrameStats.hide();
    uiComplete.hide();

    uiReset.click(function(e) {
        e.preventDefault();
        uiComplete.hide();
        startGame();
    });
};


init();
uiIntro.hide();
startGame();
