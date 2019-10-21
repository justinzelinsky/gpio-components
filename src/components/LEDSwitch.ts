import LED from './LED';
import Switch, { SwitchOptions, SwitchCallback } from './Switch';

export type LEDSwitchCallback = (isOn: boolean) => void;

export type LEDSwitchConfig = {
  ledPin: number;
  onPress: LEDSwitchCallback;
  switchOptions?: SwitchOptions;
  switchPin: number;
};

export default class LEDSwitch {
  led: LED;
  switch: Switch;

  constructor(config: LEDSwitchConfig) {
    const { ledPin, onPress, switchOptions, switchPin } = config;

    this.led = new LED({
      pin: ledPin
    });

    const onSwitchPress: SwitchCallback = () => {
      const newState: boolean = this.led.toggle();
      onPress(newState);
    };

    this.switch = new Switch({
      pin: switchPin,
      onPress: onSwitchPress,
      switchOptions
    });
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
