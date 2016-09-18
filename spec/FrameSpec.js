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
    var pinsHit = 8
    spyOn(roll, "outcome").and.callFake(function(){return pinsHit});
    frame.roll(roll);
    expect(frame._points).toEqual(pinsHit);
  })


  it('is a strike if all ten pins are hit', function() {
    spyOn(roll, "getRandomArbitrary").and.callFake(function(){return 10});
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
