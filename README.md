To play the game:
====

clone this repo and run `open index.html`
[Demo](https://tam-borine.github.io/bowling-challenge/)


Features
=================

- [x] Games consist of 10 frames
- [x] A Frame has 10 pins and 2 rolls to hit them
- [x] A roll hits pins
- [x] A strike is when all 10 pins are hit on first roll of frame, ending the frame
- [x] A spare is when all 10 pins are hit by the end of the frame/second roll
- [x] For every pin hit you get a point
- [x] Bonus points from the next roll are added to a spare's points
- [x] Bonus points from the next two rolls are added to a strike's points

Tests
===



Notes to Self
====

## 10th frame

If the player rolls a strike or spare in the 10th frame they can roll the additional balls for the bonus. But they can never roll more than 3 balls in the 10th frame. The additional rolls only count for the bonus not for the regular frame count.

    10, 10, 10 in the 10th frame gives 30 points (10 points for the regular first strike and 20 points for the bonus).
    1, 9, 10 in the 10th frame gives 20 points (10 points for the regular spare and 10 points for the bonus).

## Gutter Game

A Gutter Game is when the player never hits a pin (20 zero scores).

## Perfect Game

A Perfect Game is when the player rolls 12 strikes (10 regular strikes and 2 strikes for the bonus in the 10th frame). The Perfect Game scores 300 points.

In the image below you can find some score examples.

More about ten pin bowling here: http://en.wikipedia.org/wiki/Ten-pin_bowling

![Ten Pin Score Example](images/example_ten_pin_scoring.png)

Code Review
-----------

In code review we'll be hoping to see:

* All tests passing
* The code is elegant: every class has a clear responsibility, methods are short etc.

Reviewers will potentially be using this [code review rubric](docs/review.md).  Note that referring to this rubric in advance may make the challenge somewhat easier.  You should be the judge of how much challenge you want.

1. Open up your `.travis.yml`
2. On line 8, you will see where it looks for your code (`'src/**/*.js'`) and your tests (`'spec/**/*.js'`)
3. Adjust these to point to the correct directories
4. Done.
