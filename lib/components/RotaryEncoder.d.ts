import { Gpio } from 'onoff';
export declare type RotaryEncoderConfig = {
    onAlways?: Function;
    onDecrement?: Function;
    onIncrement?: Function;
    pinA: number;
    pinB: number;
};
export default class RotaryEncoder {
    encoderA: Gpio;
    encoderB: Gpio;
    onIncrement: Function;
    onDecrement: Function;
    onAlways: Function;
    constructor(config: RotaryEncoderConfig);
    watch(): void;
    cleanUp(): void;
}
