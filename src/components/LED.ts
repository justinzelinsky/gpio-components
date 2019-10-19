import { BinaryValue, Gpio } from 'onoff';

import { getBinaryValue } from 'components/utils';

export type LEDConfig = {
  pin: number;
};

export default class LED {
  led: Gpio;

  constructor(config: LEDConfig) {
    this.led = new Gpio(config.pin, 'out');
  }

  isOn(): boolean {
    return Boolean(this.led.readSync());
  }

  turnOn(): void {
    this.led.writeSync(Gpio.HIGH);
  }

  turnOff(): void {
    this.led.writeSync(Gpio.LOW);
  }

  toggle(): boolean {
    const toggleState: BinaryValue = getBinaryValue(this.led.readSync() ^ 1);

    this.led.writeSync(toggleState);

    return Boolean(toggleState);
  }

  cleanUp(): void {
    this.led.unexport();
  }
}
