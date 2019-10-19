"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const utils_1 = require("components/utils");
class LED {
    constructor(config) {
        this.led = new onoff_1.Gpio(config.pin, 'out');
    }
    isOn() {
        return Boolean(this.led.readSync());
    }
    turnOn() {
        this.led.writeSync(onoff_1.Gpio.HIGH);
    }
    turnOff() {
        this.led.writeSync(onoff_1.Gpio.LOW);
    }
    toggle() {
        const toggleState = utils_1.getBinaryValue(this.led.readSync() ^ 1);
        this.led.writeSync(toggleState);
        return Boolean(toggleState);
    }
    cleanUp() {
        this.led.unexport();
    }
}
exports.default = LED;
