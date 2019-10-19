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
const getBinaryValue_1 = require("components/utils/getBinaryValue");
class SevenSegmentDisplay {
    constructor(pinZero, pinOne, pinTwo, pinThree) {
        this.zero = new onoff_1.Gpio(pinZero, 'out');
        this.one = new onoff_1.Gpio(pinOne, 'out');
        this.two = new onoff_1.Gpio(pinTwo, 'out');
        this.three = new onoff_1.Gpio(pinThree, 'out');
    }
    setDisplay(displayNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.zero.write(getBinaryValue_1.default(displayNumber % 2)),
                this.one.write(getBinaryValue_1.default((displayNumber >> 1) % 2)),
                this.two.write(getBinaryValue_1.default((displayNumber >> 2) % 2)),
                this.three.write(getBinaryValue_1.default((displayNumber >> 3) % 2))
            ]);
        });
    }
    getBinaryRepresentation() {
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
