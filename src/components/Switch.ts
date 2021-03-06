import { Edge, Gpio, Options } from 'onoff';

export type SwitchCallback = () => void;

export type SwitchOptions = Options & {
  edge?: Edge;
};

export type SwitchConfig = {
  onPress: SwitchCallback;
  pin: number;
  switchOptions?: SwitchOptions;
};

export const defaultSwitchOptions: SwitchOptions = {
  debounceTimeout: 10,
  edge: 'rising'
};

class Switch {
  private switch: Gpio;
  private onPress: SwitchCallback;

  constructor(config: SwitchConfig) {
    const { onPress, pin, switchOptions = defaultSwitchOptions } = config;

    const { edge, ...options } = switchOptions;

    this.switch = new Gpio(pin, 'in', edge, options);
    this.onPress = onPress;
  }

  public watch(): void {
    this.switch.watch(err => {
      if (err) {
        throw err;
      }
      this.onPress();
    });
  }

  public cleanUp(): void {
    this.switch.unexport();
  }
}

export default Switch;
