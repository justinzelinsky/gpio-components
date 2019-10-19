import { Switch } from '../../src';

jest.useFakeTimers();

describe('Test Switch', () => {
  it('should respond to being pressed', () => {
    let isPressed = false;

    const switchButton = new Switch(1, () => (isPressed = true));

    switchButton.watch();

    jest.runOnlyPendingTimers();

    expect(isPressed).toBeTruthy();
  });

  it('should cleanup properly', () => {
    const switchButton = new Switch(1, () => {});

    expect(() => switchButton.cleanUp()).not.toThrow(Error);
  });
});
