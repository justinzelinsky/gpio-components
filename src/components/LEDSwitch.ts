import LED from './LED';
import Switch, { SwitchOptions } from './Switch';

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
    const { ledPin, onPress, switchOptions, switchPin } = config;

    const onSwitchPress = () => {
      const newState: boolean = this.led.toggle();
      onPress(newState);
    };

    this.led = new LED({
      pin: ledPin
    });

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
