"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LED_1 = require("./LED");
const Switch_1 = require("./Switch");
class LEDSwitch {
    constructor(config) {
        const { ledPin, onPress, switchOptions, switchPin } = config;
        const onSwitchPress = () => {
            const newState = this.led.toggle();
            onPress(newState);
        };
        this.led = new LED_1.default({
            pin: ledPin
        });
        this.switch = new Switch_1.default({
            pin: switchPin,
            onPress: onSwitchPress,
            switchOptions
        });
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
