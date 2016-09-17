'use-strict';
/*jshint -W117 */

describe('Roll', function(){

  var roll;

  beforeEach(function(){
    roll = new Roll();
  });

  it('has ten pins on init', function(){
    expect(roll.pins).toEqual(10);
  })

  it('has an outcome which decreases/hits the pins', function(){
    expect(roll.pins).toEqual(10);
    roll.outcome();
    expect(roll.pins).toBeLessThan(10);
  });

  it('is a strike if all ten pins are hit', function() {
    spyOn(roll, "getRandomArbitrary").and.callThrough().and.returnValue(10);
    roll.outcome();
    expect(roll.isAStrike).toEqual(true);
  })

})
