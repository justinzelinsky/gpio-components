"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const getBinaryValue_1 = require("./utils/getBinaryValue");
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
        const toggleState = getBinaryValue_1.default(this.led.readSync() ^ 1);
        this.led.writeSync(toggleState);
        return Boolean(toggleState);
    }
    cleanUp() {
        this.led.unexport();
    }
}
exports.default = LED;
