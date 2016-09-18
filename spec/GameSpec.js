'use-strict';
/*jshint -W117 */
describe('Game', function() {
  var game;
  var frame;
  var frameTwo;
  var roll;

  beforeEach(function(){
    game = new Game();
    frame = new Frame();
    frameTwo = new Frame();
    roll = new Roll();

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

  it('plays and schedules frames', function(){
    game.play(frame, roll);
    expect(game._frames).toContain(frame);
    game.play(frameTwo, roll);
    expect(game._frames).toContain(frameTwo);
  })

  it('updates score with points from last frame', function(){

  })



})
