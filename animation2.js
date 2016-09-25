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
            //var dXp = tmpAsteroid.x - platformX; //old code from other game
            //var dYp = tmpAsteroid.y - platformY;
            //var distanceP = Math.sqrt( (dXp*dXp) + (dYp*dYp) );
            if (tmpAsteroid.dying) {
                // Kill asteroid
                if (tmpAsteroid.radius > 0 && tmpAsteroid !== player) {
                    tmpAsteroid.radius-=.25;
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

        var framesRemaining = game._framesRemaining // Remove player from asteroid count
        uiFramesRemaining.html(framesRemaining);

        if (!framesRemaining) {
            // Game over
            playGame = false;
            uiFrameStats.hide();
            //some message about your score
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
