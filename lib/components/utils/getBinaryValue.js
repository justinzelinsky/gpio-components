"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const getBinaryValue = (value) => (value ? onoff_1.Gpio.HIGH : onoff_1.Gpio.LOW);
exports.default = getBinaryValue;
