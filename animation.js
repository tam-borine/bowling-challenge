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

// Class that defines new asteroids to draw
var Asteroid = function(x, y, radius, mass, friction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dying = false;
    this.mass = mass;
    this.friction = friction;

    this.vX = 0;
    this.vY = 0;

    this.player = false;
};

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

// Animation loop that does all the fun stuff
function animate() {
    // Clear
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw platform
    context.fillStyle = "black";
    context.beginPath();
    context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    // Draw player power line
    if (playerSelected) {
        context.strokeStyle = "gray";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(player.x, player.y);
        context.lineTo(powerX, powerY);
        context.closePath();
        context.stroke();
    };

    // player color
    context.fillStyle = "white";


    // Loop through every asteroid
    var deadAsteroids = [];
    var asteroidsLength = asteroids.length;
    for (var i = 0; i < asteroidsLength; i++) {
        var tmpAsteroid = asteroids[i];

        for (var j = i+1; j < asteroidsLength; j++) {
            var tmpAsteroidB = asteroids[j];

            var dX = tmpAsteroidB.x - tmpAsteroid.x;
            var dY = tmpAsteroidB.y - tmpAsteroid.y;
            var distance = Math.sqrt( (dX*dX) + (dY*dY) );

            if ((distance < tmpAsteroid.radius + tmpAsteroidB.radius)) { //collision def
              if (tmpAsteroid !== player) {
                  tmpAsteroid.dying = true;
              };
              if (tmpAsteroidB !== player) {
                 tmpAsteroidB.dying = true;
              };


                var angle = Math.atan2(dY, dX);
                var sine = Math.sin(angle);
                var cosine = Math.cos(angle);

                // Rotate asteroid position
                var x = 0;
                var y = 0;

                // Rotate asteroidB position
                var xB = dX * cosine + dY * sine;
                var yB = dY * cosine - dX * sine;

                // Rotate asteroid velocity
                var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
                var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;

                // Rotate asteroidB velocity
                var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
                var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;

                // Conserve momentum
                var vTotal = vX - vXb;
                vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass);
                vXb = vTotal + vX;

                // Move asteroids apart
                xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);

                // Rotate asteroid positions back
                tmpAsteroid.x += (x * cosine - y * sine);
                tmpAsteroid.y += (y * cosine + x * sine);

                tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine);
                tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine);

                // Rotate asteroid velocities back
                tmpAsteroid.vX = vX * cosine - vY * sine;
                tmpAsteroid.vY = vY * cosine + vX * sine;

                tmpAsteroidB.vX = vXb * cosine - vYb * sine;
                tmpAsteroidB.vY = vYb * cosine + vXb * sine;
            }
        }

        // Calculate velocity based on pixels-per-frame
        tmpAsteroid.x += tmpAsteroid.vX;
        tmpAsteroid.y += tmpAsteroid.vY;

        // Friction
        if (Math.abs(tmpAsteroid.vX) > 0.1) {
            tmpAsteroid.vX *= tmpAsteroid.friction;
        } else {
            tmpAsteroid.vX = 0;
        }

        if (Math.abs(tmpAsteroid.vY) > 0.1) {
            tmpAsteroid.vY *= tmpAsteroid.friction;
        } else {
            tmpAsteroid.vY = 0;
        }

        // Platform checks: is a non-player asteroid outside the platform
        if (!tmpAsteroid.player) {
            //var dXp = tmpAsteroid.x - platformX;
            //var dYp = tmpAsteroid.y - platformY;
            //var distanceP = Math.sqrt( (dXp*dXp) + (dYp*dYp) );
            if (tmpAsteroid.dying) {
                // Kill asteroid
                if (tmpAsteroid.radius > 0 && tmpAsteroid !== player) {
                    tmpAsteroid.radius--;
                } else {
                    tmpAsteroid.dying = false;
                    deadAsteroids.push(tmpAsteroid);
                }
            }
        }

        // Check to see if you need to reset the player
        // If player was moving, but is now still
        if (player.x !== playerOriginalX && player.y !== playerOriginalY) {
            if (player.vX == 0 && player.vY == 0) {
                resetPlayer();
            } else if (player.x+player.radius < 0) {
                // resetPlayer();
            } else if (player.x-player.radius > canvasWidth) {
                // resetPlayer();
            } else if (player.y+player.radius < 0) {
                // resetPlayer();
            } else if (player.y-player.radius > canvasHeight) {
                // resetPlayer();
            }
            player.x = (player.x + canvasWidth) % canvasWidth;
            player.y = (player.y + canvasHeight) % canvasHeight;
        }

        context.beginPath();
        context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        // cone color
        context.fillStyle = "deeppink";
    }

    var deadAsteroidsLength = deadAsteroids.length;
    if (deadAsteroidsLength > 0) {
        for (var di = 0; di < deadAsteroidsLength; di++) {
            var tmpDeadAsteroid = deadAsteroids[di];
            asteroids.splice(asteroids.indexOf(tmpDeadAsteroid), 1);
        }

        var remaining = asteroids.length - 1; // Remove player from asteroid count
        uiPinsRemaining.html(remaining);

        if (!remaining) {
            // Winner!
            playGame = false;
            uiFrameStats.hide();
            uiComplete.show();

            // Reset event handlers
            $(window).unbind("mousedown");
            $(window).unbind("mouseup");
            $(window).unbind("mousemove");
        }
    }

    if (playGame) {
        // Run the animation loop again in 33 milliseconds
        setTimeout(animate, 33);
    }
};

init();
uiIntro.hide();
startGame();
