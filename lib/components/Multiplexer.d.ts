import { Gpio } from 'onoff';
export declare type MultiplexerConfig = {
    inputPin: number;
    numSwitches: number;
    onInterrupt: OnInterruptCallback;
    outputPins: number[];
};
export declare type OnInterruptCallback = (switchIndex: number) => void;
export default class Multiplexer {
    input: Gpio;
    numSwitches: number;
    onInterrupt: OnInterruptCallback;
    outputs: Gpio[];
    timeoutId: number | undefined;
    constructor(config: MultiplexerConfig);
    watch(): void;
    cleanUp(): void;
}
