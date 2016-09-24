'use-strict';
function Frame(){
  this.pins = 10
  this._rollsRemaining = 2
  this._points = 0
  this._isAStrike = false
  this._isASpare = false
}

Frame.prototype = {

  isFinished: function(){
    return (this._isAStrike === true || this._rollsRemaining === 0);
  },

  roll: function(pinsHit, roll){//pinsHit to hardcode outcome
    this._rollsRemaining --;
    var roll = roll || new Roll();
    var pinsHit = pinsHit || roll.hitRand(0,this.pins);
    var points = roll.outcome.call(this, pinsHit);
    this._points += points;
    this.isStrike(pinsHit);
    this.isSpare(pinsHit);
  },

  isStrike: function(pinsHit){
    if ((this._points === 10) && this._rollsRemaining === 1)
       {this._isAStrike = true}
  },

  isSpare: function(pinsHit){
    if ((this._points === 10) && this._rollsRemaining === 0)
       {this._isASpare = true}
  }

}
