'use-strict';

function Frame(){
  this.pins = 10
  this._isBonusFrame = false
  this._isTenthFrame = false
  this._rollsRemaining = 2
  this._points = 0
  this._isAStrike = false
  this._isAScore = false
}


Frame.prototype = {

  roll: function(roll){
    this._rollsRemaining --;
    var roll = roll || new Roll();
    var pinsHit = roll.hitPins();
    var points = roll.outcome.call(this, pinsHit);
    this._points += points;
  },

  isStrike: function(pinsHit){
    if ((this.pins === 0) && this._rollsRemaining === 1)
       {this._isAStrike = true}
  },

  isScore: function(pinsHit){
    if ((this.pins === 0) && this._rollsRemaining === 0)
       {this._isAScore = true}
  }



}
