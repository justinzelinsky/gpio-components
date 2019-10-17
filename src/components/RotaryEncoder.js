const Gpio = require('onoff').Gpio;

const { noop } = require('../utils');

class RotaryEncoder {
  /**
   * Create an instance of a Rotary Encoder
   *
   * @constructor
   * @param {number} pinA The GPIO pin for the first Rotary Encoder pin
   * @param {number} pinB The GPIO pin for the second Rotary Encoder pin
   * @param {function} onIncrement Callback function for when the Rotary Encoder is turned clockwise
   * @param {function} onDecrement Callback function for when the Rotary Encoder is turned counterclockwise
   * @param {function} onAlways Callback function for when the Rotary Encoder is turned either direction
   */
  constructor(
    pinA,
    pinB,
    onIncrement = noop,
    onDecrement = noop,
    onAlways = noop
  ) {
    if (typeof pinA !== 'number') {
      throw new Error(`Invalid pin A ${pinA} -- must be a number.`);
    }

    if (typeof pinB !== 'number') {
      throw new Error(`Invalid pin B ${pinB} -- must be a number.`);
    }

    this.encoderA = new Gpio(pinA, 'in', 'both');
    this.encoderB = new Gpio(pinB, 'in', 'both');
    this.onIncrement = onIncrement;
    this.onDecrement = onDecrement;
    this.onAlways = onAlways;
  }

  /**
   * Begin watching the Rotary Encoder for any interactions
   *
   * @public
   */
  watch() {
    let prevA = null;
    let secondTurn = false;

    const watchFunc = err => {
      const a = this.encoderA.readSync();
      const b = this.encoderB.readSync();

      if (err) {
        throw err;
      }

      if (prevA !== a && secondTurn) {
        secondTurn = false;

        if (a !== b) {
          this.onIncrement();
        } else {
          this.onDecrement();
        }

        this.onAlways();
      } else {
        secondTurn = true;
      }

      prevA = a;
    };

    this.encoderA.watch(watchFunc);
  }

  /**
   * Cleans up the Rotary Encoder when finished
   *
   * @public
   */
  cleanUp() {
    this.encoderA.unexport();
    this.encoderB.unexport();
  }
}

module.exports = RotaryEncoder;
