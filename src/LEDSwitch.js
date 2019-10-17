const LED = require('./LED');
const Switch = require('./Switch');

const defaultSwitchOptions = {
  edge: 'rising',
  options: {
    debounceTimeout: 10
  }
};

class LEDSwitch {
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

  watch() {
    this.switch.watch();
  }

  isOn() {
    return this.led.isOn();
  }

  cleanUp() {
    this.switch.cleanUp();
    this.led.cleanUp();
  }
}

module.exports = LEDSwitch;
