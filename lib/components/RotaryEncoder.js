"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const noop_1 = require("./utils/noop");
class RotaryEncoder {
    constructor(pinA, pinB, onIncrement = noop_1.default, onDecrement = noop_1.default, onAlways = noop_1.default) {
        this.encoderA = new onoff_1.Gpio(pinA, 'in', 'both');
        this.encoderB = new onoff_1.Gpio(pinB, 'in', 'both');
        this.onIncrement = onIncrement;
        this.onDecrement = onDecrement;
        this.onAlways = onAlways;
    }
    watch() {
        let prevA = null;
        let secondTurn = false;
        const watchFunc = (err) => {
            const a = this.encoderA.readSync();
            const b = this.encoderB.readSync();
            if (err) {
                throw err;
            }
            if (prevA !== a && secondTurn) {
                secondTurn = false;
                if (a !== b) {
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
            prevA = a;
        };
        this.encoderA.watch(watchFunc);
    }
    cleanUp() {
        this.encoderA.unexport();
        this.encoderB.unexport();
    }
}
exports.default = RotaryEncoder;
