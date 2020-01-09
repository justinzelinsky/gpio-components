import { BinaryValue, Gpio } from 'onoff';

import { getBinaryValue } from './utils';

type LEDConfig = {
  pin: number;
};

class LED {
  private led: Gpio;

  constructor(config: LEDConfig) {
    this.led = new Gpio(config.pin, 'out');
  }

  public isOn(): boolean {
    return Boolean(this.led.readSync());
  }

  public turnOn(): void {
    this.led.writeSync(Gpio.HIGH);
  }

  public turnOff(): void {
    this.led.writeSync(Gpio.LOW);
  }

  public toggle(): boolean {
    const toggleState: BinaryValue = getBinaryValue(this.led.readSync() ^ 1);

    this.led.writeSync(toggleState);

    return Boolean(toggleState);
  }

  public cleanUp(): void {
    this.led.unexport();
  }
}

export default LED;
