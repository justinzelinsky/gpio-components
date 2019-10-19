import { Gpio } from 'onoff';
export declare type SevenSegmentDisplayConfig = {
    pinZero: number;
    pinOne: number;
    pinTwo: number;
    pinThree: number;
};
export default class SevenSegmentDisplay {
    zero: Gpio;
    one: Gpio;
    two: Gpio;
    three: Gpio;
    constructor(config: SevenSegmentDisplayConfig);
    setDisplay(displayNumber: number): Promise<[void, void, void, void]>;
    getBinaryRepresentation(): string;
    cleanUp(): void;
}
