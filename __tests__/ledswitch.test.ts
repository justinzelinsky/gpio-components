import { LEDSwitch } from '../src';

jest.useFakeTimers();

describe('Test LEDSwitch', () => {
  it('should have the led disabled by default', () => {
    const ledSwitch = new LEDSwitch(1, 2, () => {});

    expect(ledSwitch.isOn()).toBeFalsy();
  });

  it('should turn on the led when pressed', () => {
    const ledSwitch = new LEDSwitch(1, 2, () => {});

    ledSwitch.watch();

    jest.runOnlyPendingTimers();

    expect(ledSwitch.isOn()).toBeTruthy();
  });

  it('should cleanup properly', () => {
    const ledSwitch = new LEDSwitch(1, 2, () => {});

    expect(() => ledSwitch.cleanUp()).not.toThrow(Error);
  });
});
