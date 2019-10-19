import { Gpio } from 'onoff';
export default class Multiplexer {
    input: Gpio;
    outputs: Gpio[];
    onInterrupt: Function;
    timeoutId: number | undefined;
    numSwitches: number;
    constructor(inputPin: number, outputPins: number[], numSwitches: number, onInterrupt: Function);
    watch(): void;
    cleanUp(): void;
}
