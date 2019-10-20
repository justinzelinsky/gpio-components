"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const utils_1 = require("components/utils");
class Multiplexer {
    constructor(inputPin, outputPins, numSwitches, onInterrupt) {
        this.input = new onoff_1.Gpio(inputPin, 'in');
        this.numSwitches = numSwitches;
        this.onInterrupt = onInterrupt;
        this.outputs = outputPins.map(pin => new onoff_1.Gpio(pin, 'out'));
    }
    watch() {
        const { input, numSwitches, outputs } = this;
        const previousSelectStates = {};
        for (let i = 0; i < numSwitches; i++) {
            previousSelectStates[i] = onoff_1.Gpio.HIGH;
        }
        let selectIndex = 0;
        const checkSwitches = () => {
            Promise.all(outputs.map((output, idx) => {
                output.write(utils_1.getBinaryValue((selectIndex >> idx) % 2));
            })).then(() => {
                const selectState = input.readSync();
                const previousSelectState = previousSelectStates[selectIndex];
                if (selectState !== previousSelectState && selectState === onoff_1.Gpio.LOW) {
                    this.onInterrupt(selectIndex);
                }
                previousSelectStates[selectIndex] = selectState;
                selectIndex = (selectIndex + 1) % numSwitches;
                this.timeoutId = setTimeout(checkSwitches, 0);
            });
        };
        checkSwitches();
    }
    cleanUp() {
        clearTimeout(this.timeoutId);
        this.input.unexport();
        this.outputs.forEach(output => output.unexport());
    }
}
exports.default = Multiplexer;
