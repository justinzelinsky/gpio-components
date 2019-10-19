import LED from './LED';
import Switch, { defaultSwitchOptions, SwitchOptions } from './Switch';

export default class LEDSwitch {
  led: LED;
  switch: Switch;

  constructor(
    ledPin: number,
    switchPin: number,
    onPress: Function,
    switchOptions: SwitchOptions = defaultSwitchOptions
  ) {
    const onSwitchPress = () => {
      const newState: boolean = this.led.toggle();
      onPress(newState);
    };

    this.led = new LED(ledPin);
    this.switch = new Switch(switchPin, onSwitchPress, switchOptions);
  }

  watch(): void {
    this.switch.watch();
  }

  isOn(): boolean {
    return this.led.isOn();
  }

  cleanUp(): void {
    this.led.cleanUp();
    this.switch.cleanUp();
  }
}
