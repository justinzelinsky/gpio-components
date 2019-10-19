import { Gpio } from 'onoff';
export default class RotaryEncoder {
    encoderA: Gpio;
    encoderB: Gpio;
    onIncrement: Function;
    onDecrement: Function;
    onAlways: Function;
    constructor(pinA: number, pinB: number, onIncrement?: Function, onDecrement?: Function, onAlways?: Function);
    watch(): void;
    cleanUp(): void;
}
