import { Gpio, BinaryValue } from 'onoff';

import { getBinaryValue } from 'components/utils';

export type SevenSegmentDisplayConfig = {
  pinZero: number;
  pinOne: number;
  pinTwo: number;
  pinThree: number;
};

export default class SevenSegmentDisplay {
  zero: Gpio;
  one: Gpio;
  two: Gpio;
  three: Gpio;

  constructor(config: SevenSegmentDisplayConfig) {
    const { pinZero, pinOne, pinTwo, pinThree } = config;

    this.zero = new Gpio(pinZero, 'out');
    this.one = new Gpio(pinOne, 'out');
    this.two = new Gpio(pinTwo, 'out');
    this.three = new Gpio(pinThree, 'out');
  }

  async setDisplay(displayNumber: number): Promise<[void, void, void, void]> {
    const zeroValue: BinaryValue = getBinaryValue(displayNumber % 2);
    const oneValue: BinaryValue = getBinaryValue((displayNumber >> 1) % 2);
    const twoValue: BinaryValue = getBinaryValue((displayNumber >> 2) % 2);
    const threeValue: BinaryValue = getBinaryValue((displayNumber >> 3) % 2);

    return Promise.all([
      this.zero.write(zeroValue),
      this.one.write(oneValue),
      this.two.write(twoValue),
      this.three.write(threeValue)
    ]);
  }

  getValue(): number {
    return parseInt(this.getBinaryValue(), 2);
  }

  getBinaryValue(): string {
    const zeroNum: number = this.zero.readSync();
    const oneNum: number = this.one.readSync();
    const twoNum: number = this.two.readSync();
    const threeNum: number = this.three.readSync();

    return `${threeNum}${twoNum}${oneNum}${zeroNum}`;
  }

  cleanUp(): void {
    this.zero.unexport();
    this.one.unexport();
    this.two.unexport();
    this.three.unexport();
  }
}
