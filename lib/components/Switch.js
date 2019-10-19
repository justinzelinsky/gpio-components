"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
exports.defaultSwitchOptions = {
    debounceTimeout: 10,
    edge: 'rising'
};
class Switch {
    constructor(pin, onPress, switchOptions = exports.defaultSwitchOptions) {
        const { debounceTimeout, edge } = switchOptions;
        this.switch = new onoff_1.Gpio(pin, 'in', edge, { debounceTimeout });
        this.onPress = onPress;
    }
    watch() {
        this.switch.watch(err => {
            if (err) {
                throw err;
            }
            this.onPress();
        });
    }
    cleanUp() {
        this.switch.unexport();
    }
}
exports.default = Switch;
