const { Switch } = require('../src');

describe('Test Switch', () => {
  it('should throw an exception when trying to initialize with a non number pin', () => {
    expect(() => {
      const switchButton = new Switch('1', () => {});
    }).toThrow(Error);
  });

  it('should respond to being pressed', () => {
    let isPressed = false;

    const switchButton = new Switch(1, () => (isPressed = true));

    switchButton.watch();

    setTimeout(() => {
      expect(isPressed).toBeTruthy();
    }, 0);
  });
});
