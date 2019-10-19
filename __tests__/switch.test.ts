import { Switch } from '../src';

describe('Test Switch', () => {
  it('should respond to being pressed', () => {
    let isPressed = false;

    const switchButton = new Switch(1, () => (isPressed = true));

    switchButton.watch();

    setTimeout(() => {
      expect(isPressed).toBeTruthy();
    }, 0);
  });

  it('should cleanup properly', () => {
    const switchButton = new Switch(1, () => {});

    expect(() => switchButton.cleanUp()).not.toThrow(Error);
  });
});
