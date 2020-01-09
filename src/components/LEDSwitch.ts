import LED from './LED';
import Switch, { SwitchOptions, SwitchCallback } from './Switch';

type LEDSwitchCallback = (isOn: boolean) => void;

type LEDSwitchConfig = {
  ledPin: number;
  onPress: LEDSwitchCallback;
  switchOptions?: SwitchOptions;
  switchPin: number;
};

class LEDSwitch {
  private led: LED;
  private switch: Switch;

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

  public watch(): void {
    this.switch.watch();
  }

  public isOn(): boolean {
    return this.led.isOn();
  }

  public cleanUp(): void {
    this.led.cleanUp();
    this.switch.cleanUp();
  }
}

export default LEDSwitch;
