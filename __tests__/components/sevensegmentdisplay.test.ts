import { SevenSegmentDisplay } from '../../src';

describe('Test Seven Segment Display', () => {
  it('should be zero by default', () => {
    const sevenSegmentDisplayConfig = {
      pinZero: 1,
      pinOne: 2,
      pinTwo: 3,
      pinThree: 4
    };

    const display = new SevenSegmentDisplay(sevenSegmentDisplayConfig);
    expect(display.getBinaryValue()).toEqual('0000');
    expect(display.getValue()).toEqual(0);
  });

  it('should correctly set the values for numbers', async () => {
    const sevenSegmentDisplayConfig = {
      pinZero: 1,
      pinOne: 2,
      pinTwo: 3,
      pinThree: 4
    };
    const display = new SevenSegmentDisplay(sevenSegmentDisplayConfig);

    await display.setDisplay(1);
    expect(display.getBinaryValue()).toEqual('0001');
    expect(display.getValue()).toEqual(1);

    await display.setDisplay(2);
    expect(display.getBinaryValue()).toEqual('0010');
    expect(display.getValue()).toEqual(2);

    await display.setDisplay(3);
    expect(display.getBinaryValue()).toEqual('0011');
    expect(display.getValue()).toEqual(3);

    await display.setDisplay(4);
    expect(display.getBinaryValue()).toEqual('0100');
    expect(display.getValue()).toEqual(4);

    await display.setDisplay(5);
    expect(display.getBinaryValue()).toEqual('0101');
    expect(display.getValue()).toEqual(5);

    await display.setDisplay(6);
    expect(display.getBinaryValue()).toEqual('0110');
    expect(display.getValue()).toEqual(6);

    await display.setDisplay(7);
    expect(display.getBinaryValue()).toEqual('0111');
    expect(display.getValue()).toEqual(7);
  });

  it('should cleanup properly', () => {
    const sevenSegmentDisplayConfig = {
      pinZero: 1,
      pinOne: 2,
      pinTwo: 3,
      pinThree: 4
    };

    const display = new SevenSegmentDisplay(sevenSegmentDisplayConfig);

    expect(() => display.cleanUp()).not.toThrow(Error);
  });
});
