const Gpio = require('onoff').Gpio;

const { noop } = require('./utils');

class RotaryEncoder {
  constructor({
    pinA,
    pinB,
    onIncrement = noop,
    onDecrement = noop,
    onAlways = noop
  }) {
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

  cleanUp() {
    this.encoderA.unexport();
    this.encoderB.unexport();
  }
}

module.exports = RotaryEncoder;
