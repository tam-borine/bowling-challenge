'use-strict';

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

var buildAsteroids = function() {

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

}
