'use-strict';
/*jshint -W117 */
describe('Game', function() {
  var game;
  var frame;
  var frameTwo;
  var roll;
  var roll2;

  beforeEach(function(){
    game = new Game();
    frame = new Frame();
    frameTwo = new Frame();
    roll = new Roll();
    roll2 = new Roll();
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

  it('updates points of frames with bonuses', function(){
    spyOn(roll, "getRandomArbitrary").and.callFake(function(){return 10});
    game.play(frameTwo, roll);
    game.play(frame, roll2);
    game.play(frame, roll2);
    game.bonusCalc();
    game.updateScore();
    var totalPoints = 0
    game._frames.forEach(function(frame){totalPoints += frame._points});
    expect(game._score).toEqual(totalPoints);
  })

  it('updates score with points from frames', function(){
    game.play(frame, roll);
    game.updateScore();
    expect(game._score).toEqual(game._frames[0]._points);
  })

  it('game ends when last frame is spent')


})
