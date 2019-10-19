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
    expect(display.getBinaryRepresentation()).toEqual('0000');
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
    expect(display.getBinaryRepresentation()).toEqual('0001');

    await display.setDisplay(2);
    expect(display.getBinaryRepresentation()).toEqual('0010');

    await display.setDisplay(3);
    expect(display.getBinaryRepresentation()).toEqual('0011');

    await display.setDisplay(4);
    expect(display.getBinaryRepresentation()).toEqual('0100');

    await display.setDisplay(5);
    expect(display.getBinaryRepresentation()).toEqual('0101');

    await display.setDisplay(6);
    expect(display.getBinaryRepresentation()).toEqual('0110');

    await display.setDisplay(7);
    expect(display.getBinaryRepresentation()).toEqual('0111');
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
