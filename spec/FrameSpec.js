'use-strict';

describe('Frame', function(){
  var frame;

  beforeEach(function(){
    frame = new Frame();
  })

  it('should have a roll method', function(){
    expect(frame.roll()).toEqual("something");
  })


})
