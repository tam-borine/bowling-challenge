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
