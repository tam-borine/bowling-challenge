'use-strict';
/*jshint -W117 */
describe('Game', function() {
  var game;
  var frame;
  var frame2;

  beforeEach(function(){
    game = new Game();
    frame = new Frame();
    frameTwo = new Frame();

  })

  it('should have 10 frames at start of game', function(){
    // we haven't made any rolls yet
    expect(game._framesRemaining).toEqual(10);
  })

  it('has a nextFrame method which decreases framesRemaining count', function(){
    expect(game._framesRemaining).toEqual(10);
    game.nextFrame(frame);
    expect(game._framesRemaining).toEqual(9);
  })

  it('nextFrame returns a new frame object', function(){
    expect(game.nextFrame(frameTwo)).toEqual(jasmine.any(Frame))
    expect(game.nextFrame(frame)).not.toBe(frameTwo);
  })

  it('updates score with points from last frame', function(){
    
  })



})
