import { Gpio } from 'onoff';
export declare type OnInterruptCallback = (switchIndex: number) => void;
export default class Multiplexer {
    input: Gpio;
    outputs: Gpio[];
    onInterrupt: OnInterruptCallback;
    timeoutId: number | undefined;
    numSwitches: number;
    constructor(inputPin: number, outputPins: number[], numSwitches: number, onInterrupt: OnInterruptCallback);
    watch(): void;
    cleanUp(): void;
}
