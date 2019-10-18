const { SevenSegmentDisplay } = require('../src');

describe('Test Seven Segment Display', () => {
  it('should be zero by default', () => {
    const display = new SevenSegmentDisplay(1, 2, 3, 4);
    expect(display.getBinaryRepresentation()).toEqual('0000');
  });

  it('should throw an exception when trying to initialize with a non number pin', () => {
    expect(() => {
      const display = new SevenSegmentDisplay('1', 2, 3, 4);
    }).toThrow(Error);

    expect(() => {
      const display = new SevenSegmentDisplay(1, '2', 3, 4);
    }).toThrow(Error);

    expect(() => {
      const display = new SevenSegmentDisplay(1, 2, '3', 4);
    }).toThrow(Error);

    expect(() => {
      const display = new SevenSegmentDisplay(1, 2, 3, '4');
    }).toThrow(Error);
  });

  it('should correctly set the values for numbers', async () => {
    const display = new SevenSegmentDisplay(1, 2, 3, 4);

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
});
