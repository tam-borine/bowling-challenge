function Roll() {
  this.pins = 10
  this.isAStrike = false

}

// how would a user hit pins??
Roll.prototype = {

  outcome: function() {
    var pinsHit = parseInt(this.getRandomArbitrary(1,10));
    this.pins -= pinsHit;
    if (pinsHit === 10){this.strike()}
    return pinsHit;
  },

  strike: function() {
    this.isAStrike = true;
  },

  getRandomArbitrary: function(min, max) {
    return Math.random() * (max - min) + min;
}
}
