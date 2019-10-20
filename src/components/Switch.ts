import { Edge, Gpio, Options } from 'onoff';

export type SwitchOptions = Options & {
  edge?: Edge;
};

export type SwitchConfig = {
  onPress: SwitchOnPressCallback;
  pin: number;
  switchOptions?: SwitchOptions;
};

export const defaultSwitchOptions: SwitchOptions = {
  debounceTimeout: 10,
  edge: 'rising'
};

export type SwitchOnPressCallback = () => void;

export default class Switch {
  switch: Gpio;
  onPress: SwitchOnPressCallback;

  constructor(config: SwitchConfig) {
    const { onPress, pin, switchOptions = defaultSwitchOptions } = config;

    const { edge, ...options } = switchOptions;

    this.switch = new Gpio(pin, 'in', edge, options);
    this.onPress = onPress;
  }

  watch(): void {
    this.switch.watch(err => {
      if (err) {
        throw err;
      }
      this.onPress();
    });
  }

  cleanUp(): void {
    this.switch.unexport();
  }
}
