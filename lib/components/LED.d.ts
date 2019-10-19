import { Gpio } from 'onoff';
export declare type LEDConfig = {
    pin: number;
};
export default class LED {
    led: Gpio;
    constructor(config: LEDConfig);
    isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    toggle(): boolean;
    cleanUp(): void;
}
