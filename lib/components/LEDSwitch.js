"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LED_1 = require("./LED");
const Switch_1 = require("./Switch");
class LEDSwitch {
    constructor(config) {
        const { ledPin, onPress, switchOptions = Switch_1.defaultSwitchOptions, switchPin } = config;
        const onSwitchPress = () => {
            const newState = this.led.toggle();
            onPress(newState);
        };
        const ledConfig = {
            pin: ledPin
        };
        const switchConfig = {
            pin: switchPin,
            onPress: onSwitchPress,
            switchOptions
        };
        this.led = new LED_1.default(ledConfig);
        this.switch = new Switch_1.default(switchConfig);
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
