import { Gpio } from 'onoff';
export default class SevenSegmentDisplay {
    zero: Gpio;
    one: Gpio;
    two: Gpio;
    three: Gpio;
    constructor(pinZero: number, pinOne: number, pinTwo: number, pinThree: number);
    setDisplay(displayNumber: number): Promise<[void, void, void, void]>;
    getBinaryRepresentation(): string;
    cleanUp(): void;
}
