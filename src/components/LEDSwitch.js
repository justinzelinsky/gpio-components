const LED = require('./LED');
const Switch = require('./Switch');

const defaultSwitchOptions = {
  debounceTimeout: 10,
  edge: 'rising'
};

class LEDSwitch {
  /**
   * Create an instance of a LED Switch
   *
   * @constructor
   * @param {number} ledPin The GPIO pin for the LED
   * @param {number} switchPin The GPIO pin for the Switch
   * @param {function} onPress Callback function for when the LED Switch is pressed
   * @param {object} switchOptions Options for the LED Switch
   */
  constructor(
    ledPin,
    switchPin,
    onPress,
    switchOptions = defaultSwitchOptions
  ) {
    if (typeof switchPin !== 'number') {
      throw new Error(`Invalid switch pin ${pin} -- must be a number.`);
    }

    if (typeof ledPin !== 'number') {
      throw new Error(`Invalid LED pin ${pin} -- must be a number.`);
    }

    const onSwitchPress = () => {
      const newState = this.led.toggle();
      this.onPress(newState);
    };

    this.led = new LED(ledPin);
    this.switch = new Switch(switchPin, onSwitchPress, switchOptions);
    this.onPress = onPress;
  }

  /**
   * Begin watching the LED Switch for any interactions
   *
   * @public
   */
  watch() {
    this.switch.watch();
  }

  /**
   * Returns whether or not the LED is on
   *
   * @public
   * @return {boolean} True or false, depending if the LED is on or not.
   */
  isOn() {
    return this.led.isOn();
  }

  /**
   * Cleans up the LED Switch when finished
   *
   * @public
   */
  cleanUp() {
    this.switch.cleanUp();
    this.led.cleanUp();
  }
}

module.exports = LEDSwitch;
