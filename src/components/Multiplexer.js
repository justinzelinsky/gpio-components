const Gpio = require('onoff').Gpio;

class Multiplexer {
  /**
   * Create an instance of a Multiplexer
   *
   * @constructor
   * @param {number} inputPin The GPIO pin to check for any interrupts
   * @param {number[]} outputPins An array of GPIO selector pins
   * @param {number} numSwitches The number of switches to check for interrupts
   * @param {function} onInterrupt The function to call when a switch has been pressed
   */
  constructor(inputPin, outputPins, numSwitches, onInterrupt) {
    if (outputPins.any(pin => typeof pin !== 'number')) {
      throw new Error(`Invalid pin: ${pin}. Each pin must be a number`);
    }

    this.input = new Gpio(inputPin, 'in');
    this.outputs = outputPins.map(pin => new Gpio(pin, 'out'));
    this.onInterrupt = onInterrupt;
    this.timeoutId = null;
    this.numSwitches = numSwitches;
  }

  /**
   * Begin watching the Multiplexer for any interactions
   *
   * @public
   */
  watch() {
    const { input, numSwitches, outputs } = this;

    const previousSelectStates = {};
    for (let i = 0; i < numSwitches; i++) {
      previousSelectStates[i] = 1;
    }

    let selectIndex = 0;

    const checkSwitches = () => {
      Promise.all(
        outputs.map((output, idx) => {
          output.write((selectIndex >> idx) % 2);
        })
      ).then(() => {
        const selectState = input.readSync();
        const previousSelectState = previousSelectStates[selectIndex];

        if (selectState !== previousSelectState && selectState === 0) {
          this.onInterrupt(selectIndex);
        }

        previousSelectStates[selectIndex] = selectState;
        selectIndex = (selectIndex + 1) % numSwitches;

        this.timeoutId = setTimeout(checkSwitches, 0);
      });
    };

    checkSwitches();
  }

  /**
   * Cleans up the Multiplexer when finished
   *
   * @public
   */
  cleanUp() {
    clearTimeout(this.timeoutId);
    this.input.unexport();
    this.outputs.forEach(output => output.unexport());
  }
}

module.exports = Multiplexer;
