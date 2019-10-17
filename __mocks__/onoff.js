const onoff = jest.genMockFromModule('onoff');

class Gpio {
  constructor(pin, direction, edge, options) {
    this.pin = pin;
    this.direction = direction;
    this.edge = edge;
    this.options = options;

    this.state = 0;
  }

  readSync() {
    return this.state;
  }

  read() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.state);
      }, 500);
    });
  }

  watch(callback) {
    // TODO Come up with a better way to mock this function
    setTimeout(() => {
      callback();
    }, 0);
  }

  writeSync(value) {
    this.state = value;
  }

  write(value) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.state = value;
        resolve();
      }, 500);
    });
  }
}

Gpio.HIGH = 1;
Gpio.LOW = 0;

onoff.Gpio = Gpio;

module.exports = onoff;
