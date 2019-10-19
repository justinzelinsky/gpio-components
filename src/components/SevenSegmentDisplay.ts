import { Gpio } from 'onoff';

import { getBinaryValue } from 'components/utils';

export default class SevenSegmentDisplay {
  zero: Gpio;
  one: Gpio;
  two: Gpio;
  three: Gpio;

  constructor(
    pinZero: number,
    pinOne: number,
    pinTwo: number,
    pinThree: number
  ) {
    this.zero = new Gpio(pinZero, 'out');
    this.one = new Gpio(pinOne, 'out');
    this.two = new Gpio(pinTwo, 'out');
    this.three = new Gpio(pinThree, 'out');
  }

  async setDisplay(displayNumber: number): Promise<[void, void, void, void]> {
    return Promise.all([
      this.zero.write(getBinaryValue(displayNumber % 2)),
      this.one.write(getBinaryValue((displayNumber >> 1) % 2)),
      this.two.write(getBinaryValue((displayNumber >> 2) % 2)),
      this.three.write(getBinaryValue((displayNumber >> 3) % 2))
    ]);
  }

  getBinaryRepresentation(): string {
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
