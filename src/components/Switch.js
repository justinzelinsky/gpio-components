const Gpio = require('onoff').Gpio;

const defaultSwitchOptions = {
  debounceTimeout: 10,
  edge: 'rising'
};

class Switch {
  /**
   * Create an instance of a Switch
   *
   * @constructor
   * @param {number} pin The GPIO pin for the Switch
   * @param {function} onPress Callback function for when the Switch is pressed
   * @param {object} switchOptions Options for the Switch
   */
  constructor(pin, onPress, switchOptions = defaultSwitchOptions) {
    if (typeof pin !== 'number') {
      throw new Error(`Invalid switch pin ${pin} -- must be a number.`);
    }

    const { edge, debounceTimeout } = defaultSwitchOptions;

    this.switch = new Gpio(pin, 'in', edge, { debounceTimeout });
    this.onPress = onPress;
  }

  /**
   * Begin watching the Switch for any interactions
   *
   * @public
   */
  watch() {
    this.switch.watch(err => {
      if (err) {
        throw err;
      }
      this.onPress();
    });
  }

  /**
   * Cleans up the Switch when finished
   *
   * @public
   */
  cleanUp() {
    this.switch.unexport();
  }
}

module.exports = Switch;
