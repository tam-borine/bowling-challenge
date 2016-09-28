// Game settings
var game;
var frame;
var playGame;
var asteroids; // Array that holds all the asteroids
var player;
var playerSelected;
var playerMaxAbsVelocity;
var playerVelocityDampener;
var powerX;
var powerY;
var platformX;
var platformY;
var platformOuterRadius;
var platformInnerRadius;

// Game UI
var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiComplete = $("#gameComplete");
var uiPlay = $("#gamePlay");
var uiReset = $(".gameReset");
var uiRollsRemaining = $("#rollsRemaining");
// Stats UI
var uiFrameStats = $("#frameStats");
var uiGameStats = $("#gameStats");
var uiFramePoints = $("#framePoints");
var uiGamePoints = $("#gamePoints");
var uiFramesRemaining = $("#framesRemaining");
var uiPinsRemaining = $("#pinsRemaining");
