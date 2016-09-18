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
    spyOn(roll, "outcome").and.callThrough()
    var points = frame.roll(roll);
    expect(roll.outcome).toHaveBeenCalled();
    expect(frame._points).toEqual(points);
  })


  it('is a strike if all ten pins are hit', function() {
    spyOn(roll, "getRandomArbitrary").and.callThrough().and.returnValue(10);
    frame.roll(roll);
    expect(frame._isAStrike).toEqual(true);
  })

  it('is a spare if all ten pins are hit by second roll', function() {
    spyOn(roll, "getRandomArbitrary").and.callThrough().and.returnValue(4);
    frame.roll(roll);
    spyOn(roll2, "getRandomArbitrary").and.callThrough().and.returnValue(6);
    frame.roll(roll2);
    expect(frame._isAScore).toEqual(true);
  })

  it('finishes the frame if roll was a strike', function(){

  })


})
