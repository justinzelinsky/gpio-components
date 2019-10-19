import { Switch } from '../../src';

jest.useFakeTimers();

describe('Test Switch', () => {
  it('should respond to being pressed', () => {
    let isPressed = false;
    const switchConfig = {
      pin: 1,
      onPress: () => (isPressed = true)
    };

    const switchButton = new Switch(switchConfig);

    switchButton.watch();

    jest.runOnlyPendingTimers();

    expect(isPressed).toBeTruthy();
  });

  it('should cleanup properly', () => {
    const switchConfig = {
      pin: 1,
      onPress: () => {}
    };

    const switchButton = new Switch(switchConfig);
    expect(() => switchButton.cleanUp()).not.toThrow(Error);
  });
});
