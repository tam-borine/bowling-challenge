'use-strict';
/*jshint -W117 */
describe('Game', function() {
  var game;
  var frame;
  var frameTwo;


  beforeEach(function(){
    game = new Game();
    frame = new Frame();
    frameTwo = new Frame();

  });

  it('should have 10 frames at start of game', function(){
    // we haven't made any rolls yet
    expect(game._framesRemaining).toEqual(10);
  });

  it('has a nextFrame method which decreases framesRemaining count', function(){
    expect(game._framesRemaining).toEqual(10);
    game.nextFrame(frame);
    expect(game._framesRemaining).toEqual(9);
  });

  it('nextFrame returns a new frame object', function(){
    expect(game.nextFrame(frameTwo)).toEqual(jasmine.any(Frame))
    expect(game.nextFrame(frame)).not.toBe(frameTwo);
  });

  it('play function plays a frame', function(){
    game.play();
    expect(game._frames.length).toEqual(1);
  });

  it('updates score with points of frames', function(){
    helperModule.playArgTimes(5,game)
    game.updateScore();
    console.log(game._frames);
    expect(game._score).toEqual(helperModule.totalPoints(game));
  });

  it('adds bonuses to points', function(){
    spyOn(roll, "outcome").and.returnValues(10,3,4,9,1,2,2);
    helperModule.playArgTimes(4,game);
    game.bonusCalc();
    game.updateScore();
    expect(game._score).toEqual(40);
  });


  it('game ends when last frame is spent', function(){
    helperModule.playArgTimes(30,game);
    // console.log(game._framesRemaining);
    expect(game.isOver()).toEqual(true);
  });

  it('frames remaining stops at 0 and game ends')


})
