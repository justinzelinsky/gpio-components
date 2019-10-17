const Gpio = require('onoff').Gpio;

class SevenSegmentDisplay {
  /**
   * Create an instance of a Rotary Encoder
   *
   * @constructor
   * @param {number} pinZero The GPIO pin for position 2^0 in the Seven Segment Display
   * @param {number} pinOne The GPIO pin for position 2^1 in the Seven Segment Display
   * @param {number} pinTwo The GPIO pin for position 2^2 in the Seven Segment Display
   * @param {number} piNThree The GPIO pin for position 2^3 in the Seven Segment Display
   */
  constructor(pinZero, pinOne, pinTwo, pinThree) {
    if (typeof pinZero !== 'number') {
      throw new Error(
        `Invalid zero display pin ${pinZero} -- must be a number.`
      );
    }

    if (typeof pinOne !== 'number') {
      throw new Error(`Invalid one display pin ${pinOne} -- must be a number.`);
    }

    if (typeof pinTwo !== 'number') {
      throw new Error(`Invalid two display pin ${pinTwo} -- must be a number.`);
    }

    if (typeof pinThree !== 'number') {
      throw new Error(
        `Invalid three display pin ${pinThree} -- must be a number.`
      );
    }

    this.zero = new Gpio(pinZero, 'out');
    this.one = new Gpio(pinOne, 'out');
    this.two = new Gpio(pinTwo, 'out');
    this.three = new Gpio(pinThree, 'out');
  }

  /**
   * Set the Seven Segment Display to a number
   *
   * @public
   * @param {number} number The number to display
   * @returns {Promise} A promise which will resolve once the display is set
   */
  async setDisplay(number) {
    return Promise.all([
      this.zero.write(number % 2),
      this.one.write((number >> 1) % 2),
      this.two.write((number >> 2) % 2),
      this.three.write((number >> 3) % 2)
    ]);
  }

  /**
   * Get the binary representation of the current number displayed
   *
   * @public
   * @returns {string} A binary representation of the current number displayed
   */
  getBinaryRepresentation() {
    const zeroNum = this.zero.readSync();
    const oneNum = this.one.readSync();
    const twoNum = this.two.readSync();
    const threeNum = this.three.readSync();
    return `${threeNum}${twoNum}${oneNum}${zeroNum}`;
  }

  /**
   * Cleans up the Rotary Encoder when finished
   *
   * @public
   */
  cleanUp() {
    this.zero.unexport();
    this.one.unexport();
    this.two.unexport();
    this.three.unexport();
  }
}

module.exports = SevenSegmentDisplay;
