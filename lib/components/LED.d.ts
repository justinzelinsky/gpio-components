declare type LEDConfig = {
    pin: number;
};
declare class LED {
    private led;
    constructor(config: LEDConfig);
    isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    toggle(): boolean;
    cleanUp(): void;
}
export default LED;
