// var game = $("#game");
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Canvas dimensions
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;


function loadGame(game){
  game = game || new Game();
  gameVarInits();
  buildAsteroids();

  startFrame(game.nextFrame) //responsibility of loadGame?
  showGameStats(game);

  game.play();

  listenOnResetButton();
};


function orchestrateGame(){

}

function startFrame(frame) {

    frame = frame() || new Frame();
    frame.pins = asteroids.length-1; //remove player from Asteroid count
    showFrameStats(frame)
    mouseEvents();
    // Start the animation loop
    animate();

};

function initHomeScreen() {
    uiFrameStats.hide();
    uiComplete.hide();
    uiIntro.show();

    uiPlay.click(function(e){
      e.preventDefault();
      uiIntro.hide();
      uiComplete.hide();
      loadGame();

    })


};

initHomeScreen();
