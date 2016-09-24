'use-strict';
/*jshint -W117 */
describe('Frame', function(){
  var frame;
  var roll;
  var roll2;

  beforeEach(function(){
    frame = new Frame();
    roll = new Roll();
    roll2 = new Roll();
  })

  it('roll method updates points by pins hit', function(){
    var pinsHit = 8;
    frame.roll(8);
    expect(frame._points).toEqual(pinsHit);
  })

  it('is a strike if all ten pins are hit', function() {
    frame.roll(10);
    expect(frame._isAStrike).toEqual(true);
  })

  it('is a spare if all ten pins are hit by second roll', function() {
    frame.roll(5);
    frame.roll(5);
    expect(frame._isASpare).toEqual(true);
  })

  it('finishes the frame if roll was a strike', function(){
    frame.roll(10);
    expect(frame._isAStrike).toEqual(true);
    expect(frame.isFinished()).toBe(true);
  })


})
