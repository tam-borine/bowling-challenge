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

  it('plays and updates frames', function(){
    game.play();
    expect(game._frames.length).toEqual(1);
  })

  it('updates points of frames with bonuses', function(){
    // spyOn(roll, "getRandomArbitrary").and.callFake(function(){return 10});
    // game.play();
    helperModule.playArgTimes(5,game)
    game.bonusCalc();
    game.updateScore();
    var totalPoints = 0
    expect(game._score).toEqual(helperModule.totalPoints(game));
  })


  it('game ends when last frame is spent', function(){
    helperModule.playArgTimes(30,game);
    console.log(game._framesRemaining);
    expect(game.isOver()).toEqual(true);
  });


})
