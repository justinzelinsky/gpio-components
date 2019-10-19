import { LEDSwitch } from '../../src';

jest.useFakeTimers();

describe('Test LEDSwitch', () => {
  it('should have the led disabled by default', () => {
    const ledSwitchConfig = {
      ledPin: 1,
      switchPin: 2,
      onPress: () => {}
    };
    const ledSwitch = new LEDSwitch(ledSwitchConfig);

    expect(ledSwitch.isOn()).toBeFalsy();
  });

  it('should turn on the led when pressed', () => {
    const ledSwitchConfig = {
      ledPin: 1,
      switchPin: 2,
      onPress: () => {}
    };
    const ledSwitch = new LEDSwitch(ledSwitchConfig);

    ledSwitch.watch();

    jest.runOnlyPendingTimers();

    expect(ledSwitch.isOn()).toBeTruthy();
  });

  it('should cleanup properly', () => {
    const ledSwitchConfig = {
      ledPin: 1,
      switchPin: 2,
      onPress: () => {}
    };
    const ledSwitch = new LEDSwitch(ledSwitchConfig);

    expect(() => ledSwitch.cleanUp()).not.toThrow(Error);
  });
});
