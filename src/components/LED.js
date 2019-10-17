const Gpio = require('onoff').Gpio;

class LED {
  /**
   * Create an instance of a LED
   *
   * @constructor
   * @param {number} pin The GPIO pin for the LED
   */
  constructor(pin) {
    if (typeof pin !== 'number') {
      throw new Error(`Invalid pin ${pin} -- must be a number.`);
    }

    this.led = new Gpio(pin, 'out');
  }

  /**
   * Returns whether or not the LED is on
   *
   * @public
   * @return {boolean} True or false, depending if the LED is on or not.
   */
  isOn() {
    return Boolean(this.led.readSync());
  }

  /**
   * Turns the LED on
   *
   * @public
   */
  turnOn() {
    this.led.writeSync(Gpio.HIGH);
  }

  /**
   * Turns the LED off
   *
   * @public
   */
  turnOff() {
    this.led.writeSync(Gpio.LOW);
  }

  /**
   * Toggles the current state of the LED
   *
   * @public
   * @returns {boolean} The current state of the toggled LED
   */

  toggle() {
    const toggledState = this.led.readSync() ^ 1;

    this.led.writeSync(toggledState);

    return Boolean(toggledState);
  }

  /**
   * Cleans up the LED when finished
   *
   * @public
   */
  cleanUp() {
    this.led.unexport();
  }
}

module.exports = LED;
