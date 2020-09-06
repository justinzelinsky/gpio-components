import { BinaryValue, Gpio, ValueCallback } from 'onoff';

import noop from './utils/noop';

type RotaryEncoderConfig = {
  onAlways?: Function;
  onDecrement?: Function;
  onIncrement?: Function;
  pinA: number;
  pinB: number;
};

class RotaryEncoder {
  private encoderA: Gpio;
  private encoderB: Gpio;
  private onIncrement: Function;
  private onDecrement: Function;
  private onAlways: Function;

  constructor(config: RotaryEncoderConfig) {
    const {
      onAlways = noop,
      onDecrement = noop,
      onIncrement = noop,
      pinA,
      pinB
    } = config;

    this.encoderA = new Gpio(pinA, 'in', 'both');
    this.encoderB = new Gpio(pinB, 'in', 'both');
    this.onIncrement = onIncrement;
    this.onDecrement = onDecrement;
    this.onAlways = onAlways;
  }

  public watch(): void {
    let prevA: null | number = null;
    let secondTurn: boolean = false;

    const watchFunc: ValueCallback = (
      err: Error | null | undefined,
      aValue: BinaryValue
    ) => {
      if (err) {
        throw err;
      }

      const bValue: BinaryValue = this.encoderB.readSync();

      if (prevA !== aValue && secondTurn) {
        secondTurn = false;

        if (aValue !== bValue) {
          this.onIncrement();
        } else {
          this.onDecrement();
        }

        this.onAlways();
      } else {
        secondTurn = true;
      }

      prevA = aValue;
    };

    this.encoderA.watch(watchFunc);
  }

  public cleanUp(): void {
    this.encoderA.unexport();
    this.encoderB.unexport();
  }
}

export default RotaryEncoder;
