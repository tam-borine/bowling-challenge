
function showGameStats(game){
  uiGameStats.show();
  uiFramesRemaining.html(game._framesRemaining);
  uiGamePoints.html(game._score);
}

function showFrameStats(frame){
  uiFrameStats.show();
  uiFramePoints.html(frame._points);
  uiRollsRemaining.html(frame._rollsRemaining);
  uiPinsRemaining.html(frame.pins);  //show pins remaining
}
