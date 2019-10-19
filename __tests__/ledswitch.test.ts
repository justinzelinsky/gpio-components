import { LEDSwitch } from '../src';

describe('Test LEDSwitch', () => {
  it('should have the led disabled by default', () => {
    const ledSwitch = new LEDSwitch(1, 2, () => {});

    expect(ledSwitch.isOn()).toBeFalsy();
  });

  it('should turn on the led when pressed', () => {
    const ledSwitch = new LEDSwitch(1, 2, () => {});

    ledSwitch.watch();

    setTimeout(() => {
      expect(ledSwitch.isOn()).toBeTruthy();
    }, 0);
  });
});
