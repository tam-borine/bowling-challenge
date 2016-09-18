'use-strict';

function Game(){
  this._framesRemaining = 10
  this._score = 0
}

Game.prototype = {

  nextFrame: function(frame) {
  this._framesRemaining --;
  var frame = frame || new Frame();
  return frame;
},

  updateScore: function(){
    this._score += frame._points();
  }

}
