
var helperModule = (function() {
  var _helpers = {};

   _helpers.totalPoints = function(game) {
     var totalPoints = 0;
     game._frames.forEach(function(frame){
       totalPoints += frame._points});
       return totalPoints;
    }

    _helpers.playArgTimes = function(times, game){
      for(var i=0; i < times; i++){
        game.play();
      }
    }

return _helpers;
})();
