'use-strict';
/*jshint -W117 */
describe('Frame', function(){
  var frame;
  var roll;

  beforeEach(function(){
    frame = new Frame();
    roll = new Roll();
  })

  it('should have a roll method that returns a number of pins hit', function(){
    expect(frame.roll(roll)).toEqual(jasmine.any(Number));
  })


})
