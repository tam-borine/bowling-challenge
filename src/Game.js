'use-strict';

function Game(){
  this._framesRemaining = 10
  this._score = 0
  this._frames = []
}

Game.prototype = {

  nextFrame: function(frame) {
  this._framesRemaining --;
  var frame = frame || new Frame();
  return frame;
  },

  lastFrame: function() {
    return this._frames[this._frames.length - 1];
  },

  play: function(frame, roll){
    this.lastFrame || frame.isFinished() || this.nextFrame() ;
    frame.roll(roll);
    this._frames.push(frame)
  },

  bonusCalc: function(){
    this._frames.forEach(function(frame){
      var twoback = this._frames[frame - 2]
      var oneback = this._frames[frame - 1]
      if (twoback && twoback.isAStrike) {
        twoback._points += frame._points }
      else if (oneback && oneback.isAScore) {
        oneback._points += frame._points }
    }, this);
  },

  updateScore: function(){
    this._frames.forEach(function(frame){
      this._score += frame._points;
    }, this)
  }

}
