import { Gpio } from 'onoff';

export default class LED {
  led: Gpio;

  constructor(pin: number) {
    this.led = new Gpio(pin, 'out');
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
    const toggleState: number = this.led.readSync() ^ 1;

    this.led.writeSync(toggleState ? Gpio.HIGH : Gpio.LOW);

    return Boolean(toggleState);
  }

  cleanUp(): void {
    this.led.unexport();
  }
}
