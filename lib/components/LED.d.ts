import { Gpio } from 'onoff';
export default class LED {
    led: Gpio;
    constructor(pin: number);
    isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    toggle(): boolean;
    cleanUp(): void;
}
