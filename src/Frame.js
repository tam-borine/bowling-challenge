'use-strict';

function Frame(){
  this._isBonusFrame = false
  this._isTenthFrame = false
  this._rollsRemaining = 2
  this._points = 0
}


Frame.prototype = {

  roll: function(roll){
    this._rollsRemaining --;
    var roll = roll || new Roll();
    var points = roll.outcome();
    this._points += points;
    return points
  },



}
