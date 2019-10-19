"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LED_1 = require("./LED");
const Switch_1 = require("./Switch");
class LEDSwitch {
    constructor(ledPin, switchPin, onPress, switchOptions = Switch_1.defaultSwitchOptions) {
        const onSwitchPress = () => {
            const newState = this.led.toggle();
            onPress(newState);
        };
        this.led = new LED_1.default(ledPin);
        this.switch = new Switch_1.default(switchPin, onSwitchPress, switchOptions);
    }
    watch() {
        this.switch.watch();
    }
    isOn() {
        return this.led.isOn();
    }
    cleanUp() {
        this.led.cleanUp();
        this.switch.cleanUp();
    }
}
exports.default = LEDSwitch;
