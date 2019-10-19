import { BinaryValue, Gpio, ValueCallback } from 'onoff';

import { noop } from './utils';

export default class RotaryEncoder {
  encoderA: Gpio;
  encoderB: Gpio;
  onIncrement: Function;
  onDecrement: Function;
  onAlways: Function;

  constructor(
    pinA: number,
    pinB: number,
    onIncrement: Function = noop,
    onDecrement: Function = noop,
    onAlways: Function = noop
  ) {
    this.encoderA = new Gpio(pinA, 'in', 'both');
    this.encoderB = new Gpio(pinB, 'in', 'both');
    this.onIncrement = onIncrement;
    this.onDecrement = onDecrement;
    this.onAlways = onAlways;
  }

  watch(): void {
    let prevA: null | number = null;
    let secondTurn: boolean = false;

    const watchFunc: ValueCallback = (err: Error | null | undefined) => {
      const a: BinaryValue = this.encoderA.readSync();
      const b: BinaryValue = this.encoderB.readSync();

      if (err) {
        throw err;
      }

      if (prevA !== a && secondTurn) {
        secondTurn = false;

        if (a !== b) {
          this.onIncrement();
        } else {
          this.onDecrement();
        }

        this.onAlways();
      } else {
        secondTurn = true;
      }

      prevA = a;
    };

    this.encoderA.watch(watchFunc);
  }

  cleanUp(): void {
    this.encoderA.unexport();
    this.encoderB.unexport();
  }
}
