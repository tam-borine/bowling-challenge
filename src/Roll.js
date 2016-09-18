function Roll() {

}

Roll.prototype = {

  outcome: function() {
    var pinsHit = parseInt(Math.random() * (10 - 1) + 1);
    this.pins -= pinsHit; //this refers to frame
    this.isStrike(pinsHit);//Frame.roll sets this with .call
    this.isScore(pinsHit);//this refers to frame
    return pinsHit;
  },

  getRandomArbitrary: function(min, max) { //use bind for .outcome????
    return Math.random() * (max - min) + min;
}
}
