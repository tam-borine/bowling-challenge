'use-strict';

/*globals $:false */
$(document).ready(function(){
  var game = new Game();

  function loopy() {
    if (game.isOver()) {
      $("#bowlButton").hide();
      $("#playButton").show();
      alert("Game Over!");
      game = new Game();
        }
     }

  function updateInfo(){
    $('#framesRemaining').text("Frames remaining: " + game._framesRemaining);
    $('#gameScore').text("Score: " + game._score);
  }

  $("#bowlButton").hide();

  $("#playButton").click(function(){
      $("#bowlButton").show();
      $("#playButton").hide();
      updateInfo();
  });

  $("#bowlButton").click(function(){
      game.play();
      game.bonusCalc();
      game.updateScore();
      updateInfo();
      loopy();
  });

});
