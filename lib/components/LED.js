"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
class LED {
    constructor(pin) {
        this.led = new onoff_1.Gpio(pin, 'out');
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
        const toggleState = this.led.readSync() ^ 1;
        this.led.writeSync(toggleState ? onoff_1.Gpio.HIGH : onoff_1.Gpio.LOW);
        return Boolean(toggleState);
    }
    cleanUp() {
        this.led.unexport();
    }
}
exports.default = LED;
