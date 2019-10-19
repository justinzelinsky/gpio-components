import { LED } from '../src';

describe('Test LED', () => {
  it('should be off when initialized', () => {
    const led = new LED(1);

    expect(led.isOn()).toBeFalsy();
  });

  it('should be able to turn on', () => {
    const led = new LED(1);

    expect(led.isOn()).toBeFalsy();

    led.turnOn();

    expect(led.isOn()).toBeTruthy();
  });

  it('should turn on when toggled', () => {
    const led = new LED(1);

    expect(led.isOn()).toBeFalsy();

    led.toggle();

    expect(led.isOn()).toBeTruthy();
  });

  it('should be able to turn off', () => {
    const led = new LED(1);

    expect(led.isOn()).toBeFalsy();

    led.toggle();

    expect(led.isOn()).toBeTruthy();

    led.turnOff();

    expect(led.isOn()).toBeFalsy();
  });

  it('should be able to toggle multiple times correctly', () => {
    const led = new LED(1);

    expect(led.isOn()).toBeFalsy();

    led.toggle();
    led.toggle();
    led.toggle();
    led.toggle();
    led.toggle();

    expect(led.isOn()).toBeTruthy();
  });

  it('should cleanup properly', () => {
    const led = new LED(1);

    expect(() => led.cleanUp()).not.toThrow(Error);
  });
});
