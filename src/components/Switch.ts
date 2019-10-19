import { Edge, Gpio } from 'onoff';

export type SwitchOptions = {
  debounceTimeout?: number;
  edge?: Edge;
};

export const defaultSwitchOptions: SwitchOptions = {
  debounceTimeout: 10,
  edge: 'rising'
};

export default class Switch {
  switch: Gpio;
  onPress: Function;

  constructor(
    pin: number,
    onPress: Function,
    switchOptions: SwitchOptions = defaultSwitchOptions
  ) {
    const { debounceTimeout, edge } = switchOptions;

    this.switch = new Gpio(pin, 'in', edge, { debounceTimeout });
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
