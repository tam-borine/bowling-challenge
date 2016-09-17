function Roll() {
  this.pins = 10

}

// how would a user hit pins??
Roll.prototype = {
  outcome: function() {
    this.pins -= parseInt(this.getRandomArbitrary(1,10));
  },

  getRandomArbitrary: function(min, max) {
    return Math.random() * (max - min) + min;
}
}
