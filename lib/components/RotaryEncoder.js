"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const utils_1 = require("./utils");
class RotaryEncoder {
    constructor(config) {
        const { onAlways = utils_1.noop, onDecrement = utils_1.noop, onIncrement = utils_1.noop, pinA, pinB } = config;
        this.encoderA = new onoff_1.Gpio(pinA, 'in', 'both');
        this.encoderB = new onoff_1.Gpio(pinB, 'in', 'both');
        this.onIncrement = onIncrement;
        this.onDecrement = onDecrement;
        this.onAlways = onAlways;
    }
    watch() {
        let prevA = null;
        let secondTurn = false;
        const watchFunc = (err, aValue) => {
            if (err) {
                throw err;
            }
            const bValue = this.encoderB.readSync();
            if (prevA !== aValue && secondTurn) {
                secondTurn = false;
                if (aValue !== bValue) {
                    this.onIncrement();
                }
                else {
                    this.onDecrement();
                }
                this.onAlways();
            }
            else {
                secondTurn = true;
            }
            prevA = aValue;
        };
        this.encoderA.watch(watchFunc);
    }
    cleanUp() {
        this.encoderA.unexport();
        this.encoderB.unexport();
    }
}
exports.default = RotaryEncoder;
