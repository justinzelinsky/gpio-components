"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const utils_1 = require("./utils");
class SevenSegmentDisplay {
    constructor(config) {
        const { pinZero, pinOne, pinTwo, pinThree } = config;
        this.zero = new onoff_1.Gpio(pinZero, 'out');
        this.one = new onoff_1.Gpio(pinOne, 'out');
        this.two = new onoff_1.Gpio(pinTwo, 'out');
        this.three = new onoff_1.Gpio(pinThree, 'out');
    }
    setDisplay(displayNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const zeroValue = utils_1.getBinaryValue(displayNumber % 2);
            const oneValue = utils_1.getBinaryValue((displayNumber >> 1) % 2);
            const twoValue = utils_1.getBinaryValue((displayNumber >> 2) % 2);
            const threeValue = utils_1.getBinaryValue((displayNumber >> 3) % 2);
            return Promise.all([
                this.zero.write(zeroValue),
                this.one.write(oneValue),
                this.two.write(twoValue),
                this.three.write(threeValue)
            ]);
        });
    }
    getValue() {
        return parseInt(this.getBinaryValue(), 2);
    }
    getBinaryValue() {
        const zeroNum = this.zero.readSync();
        const oneNum = this.one.readSync();
        const twoNum = this.two.readSync();
        const threeNum = this.three.readSync();
        return `${threeNum}${twoNum}${oneNum}${zeroNum}`;
    }
    cleanUp() {
        this.zero.unexport();
        this.one.unexport();
        this.two.unexport();
        this.three.unexport();
    }
}
exports.default = SevenSegmentDisplay;
