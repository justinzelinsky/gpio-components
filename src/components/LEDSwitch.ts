import LED from './LED';
import Switch, { defaultSwitchOptions, SwitchOptions } from './Switch';

export type OnPressCallback = (isOn: boolean) => void;

export type LEDSwitchConfig = {
  ledPin: number;
  onPress: OnPressCallback;
  switchOptions?: SwitchOptions;
  switchPin: number;
};

export default class LEDSwitch {
  led: LED;
  switch: Switch;

  constructor(config: LEDSwitchConfig) {
    const {
      ledPin,
      onPress,
      switchOptions = defaultSwitchOptions,
      switchPin
    } = config;

    const onSwitchPress = () => {
      const newState: boolean = this.led.toggle();
      onPress(newState);
    };

    const ledConfig = {
      pin: ledPin
    };

    const switchConfig = {
      pin: switchPin,
      onPress: onSwitchPress,
      switchOptions
    };

    this.led = new LED(ledConfig);
    this.switch = new Switch(switchConfig);
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
