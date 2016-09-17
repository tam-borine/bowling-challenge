'use-strict';

describe('Frame', function(){
  var frame;
  var roll;

  beforeEach(function(){
    frame = new Frame();
    roll = new Roll();
  })

  it('should have a roll method', function(){
    expect(frame.roll(roll)).toEqual(roll);
  })


})
/*jshint -W117 */
