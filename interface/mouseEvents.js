//includes mouseEvents and listenOnResetButton
function mouseEvents() {
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
                    animate(); //auto animate
                };

                var dX = player.x-canvasX; //get difference in position between cursor and player
                var dY = player.y-canvasY;
                var distance = Math.sqrt( (dX*dX) + (dY*dY) );
                var padding = 0;

                if (distance < player.radius+padding) {
                    powerX = canvasX; //WHAT IS HAPPENING HERE???
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
                var distance = Math.sqrt((dX*dX)+(dY*dY));

                if (distance*playerVelocityDampener < playerMaxAbsVelocity) {
                    player.vX = -(dX*playerVelocityDampener);
                    player.vY = -(dY*playerVelocityDampener);
                } else {
                    var ratio = playerMaxAbsVelocity / (distance*playerVelocityDampener);
                    player.vX = -((dX*ratio)*playerVelocityDampener);
                    player.vY = -((dY*ratio)*playerVelocityDampener);
                };

                // frame._rollsRemaining--
                // uiRollsRemaining.html(frame._rollsRemaining); //change to rolls remining property of Frame


            };
        };

        playerSelected = false;
        powerX = -1;  //reset settings
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

  } //mouseEvents function ends here


  function listenOnResetButton(){
    uiReset.click(function(e) {
        e.preventDefault();
        uiComplete.hide();
        loadGame();
    });
  }
