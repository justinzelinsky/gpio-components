"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
function getBinaryValue(value) {
    return value ? onoff_1.Gpio.HIGH : onoff_1.Gpio.LOW;
}
exports.default = getBinaryValue;
