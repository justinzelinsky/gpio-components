const Gpio = require('onoff').Gpio;

class LED {
  constructor(pin) {
    if (typeof pin !== 'number') {
      throw new Error(`Invalid pin ${pin} -- must be a number.`);
    }

    this.led = new Gpio(pin, 'out');
  }

  isOn() {
    return Boolean(this.led.readSync());
  }

  on() {
    this.led.writeSync(Gpio.HIGH);
  }

  off() {
    this.led.writeSync(Gpio.LOW);
  }

  toggle() {
    const toggledState = this.led.readSync() ^ 1;

    this.led.writeSync(toggledState);

    return Boolean(toggledState);
  }

  cleanUp() {
    this.led.unexport();
  }
}

module.exports = LED;
