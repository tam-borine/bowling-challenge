'use-strict';
/*jshint -W117 */
describe('Frame', function(){
  var frame;
  var roll;

  beforeEach(function(){
    frame = new Frame();
    roll = new Roll();
  })

  it('roll method updates points by pins hit', function(){
    spyOn(roll, "outcome").and.callThrough()
    var points = frame.roll(roll);
    expect(roll.outcome).toHaveBeenCalled();
    expect(frame._points).toEqual(points);
  })


})
