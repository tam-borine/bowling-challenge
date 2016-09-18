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

  play: function(frame, roll){
    frame.roll(roll)
    this._frames.push(frame)
  },

  updateScore: function(){
    this._score += frame._points();
  }

}
