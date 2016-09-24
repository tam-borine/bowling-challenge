'use-strict';
function Roll() {
}

Roll.prototype = {

  outcome: function(pinsHit) {
    this.pins -= pinsHit;//this is Frame here, see Frame#roll
    return pinsHit;
  },

  hitRand: function(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
}
