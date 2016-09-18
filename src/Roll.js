function Roll() {

}

Roll.prototype = {

  outcome: function(pinsHit) {
    this.pins -= pinsHit; //this refers to frame
    this.isStrike(pinsHit);//Frame.roll sets this with .call
    this.isScore(pinsHit);//this refers to frame
    return pinsHit;
  },

  hitPins: function(){
    return parseInt(this.getRandomArbitrary(1,10));
  },

  getRandomArbitrary: function(min, max) { //use bind for .outcome????
    return Math.random() * (max - min) + min;
}
}
