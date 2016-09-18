'use-strict';
/*jshint -W117 */
describe('Game', function() {
  var game;
  var frame;
  var frame2;
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

  it('plays the frame', function(){
    spyOn(roll, "getRandomArbitrary").and.callFake(function(){return 10});
    game.play(frame, roll);
    console.log(game._frames)
    expect(game._frames).toContain(frame);
  })

  it('updates score with points from last frame', function(){

  })



})
