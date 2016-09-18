'use-strict';

/*globals $:false */
$(document).ready(function(){
  var game = new Game();

  function updateInfo(){
    $('#framesRemaining').text("Frames remaining: " + game._framesRemaining);
    $('#gameScore').text("Score: " + game._score);
  }

  $("#bowlButton").hide();

  $("#beginButton").click(function(){
      $("#bowlButton").show();
      $("#beginButton").hide();
      updateInfo();
  });

  $("#bowlButton").click(function(){
    game.play(game.nextFrame());
    game.bonusCalc();
    game.updateScore();
    updateInfo();
  });

});
