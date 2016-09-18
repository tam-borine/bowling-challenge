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
    console.log(this.lastFrame());
    this.lastFrame || this.isFinished(this.lastFrame()) || this.nextFrame();
    frame.roll(roll);
    console.log(frame)
    this._frames.push(frame)
  },

  updateScore: function(){
    this._score += frame._points();
  }

}
