"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const getBinaryValue_1 = require("components/utils/getBinaryValue");
class Multiplexer {
    constructor(inputPin, outputPins, numSwitches, onInterrupt) {
        this.input = new onoff_1.Gpio(inputPin, 'in');
        this.outputs = outputPins.map(pin => new onoff_1.Gpio(pin, 'out'));
        this.onInterrupt = onInterrupt;
        this.numSwitches = numSwitches;
    }
    watch() {
        const { input, numSwitches, outputs } = this;
        const previousSelectStates = {};
        for (let i = 0; i < numSwitches; i++) {
            previousSelectStates[i] = 1;
        }
        let selectIndex = 0;
        const checkSwitches = () => {
            Promise.all(outputs.map((output, idx) => {
                output.write(getBinaryValue_1.default((selectIndex >> idx) % 2));
            })).then(() => {
                const selectState = input.readSync();
                const previousSelectState = previousSelectStates[selectIndex];
                if (selectState !== previousSelectState && selectState === 0) {
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
