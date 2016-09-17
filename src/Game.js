'use-strict';

function Game(){
  this._framesRemaining = 10
  this._score = 0
}

Game.prototype = {

  nextFrame: function(frames) {
  this._framesRemaining --;
  var frames = frames || new Frame();
  return frames;
},

  updateScore: function(){

  }

}
