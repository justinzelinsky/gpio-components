const Gpio = require('onoff').Gpio;

const defaultSwitchOptions = {
  edge: 'rising',
  options: {
    debounceTimeout: 10
  }
};

class Switch {
  constructor(pin, onPress, switchOptions = defaultSwitchOptions) {
    if (typeof pin !== 'number') {
      throw new Error(`Invalid switch pin ${pin} -- must be a number.`);
    }

    this.switch = new Gpio(
      pin,
      'in',
      switchOptions.edge,
      switchOptions.options
    );
    this.onPress = onPress;
  }

  watch() {
    this.switch.watch(err => {
      if (err) {
        throw err;
      }
      this.onPress();
    });
  }

  cleanUp() {
    this.switch.unexport();
  }
}

module.exports = Switch;
