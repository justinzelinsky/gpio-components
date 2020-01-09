declare type RotaryEncoderConfig = {
    onAlways?: Function;
    onDecrement?: Function;
    onIncrement?: Function;
    pinA: number;
    pinB: number;
};
declare class RotaryEncoder {
    private encoderA;
    private encoderB;
    private onIncrement;
    private onDecrement;
    private onAlways;
    constructor(config: RotaryEncoderConfig);
    watch(): void;
    cleanUp(): void;
}
export default RotaryEncoder;
