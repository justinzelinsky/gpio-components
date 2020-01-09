import { SwitchOptions } from './Switch';
declare type LEDSwitchCallback = (isOn: boolean) => void;
declare type LEDSwitchConfig = {
    ledPin: number;
    onPress: LEDSwitchCallback;
    switchOptions?: SwitchOptions;
    switchPin: number;
};
declare class LEDSwitch {
    private led;
    private switch;
    constructor(config: LEDSwitchConfig);
    watch(): void;
    isOn(): boolean;
    cleanUp(): void;
}
export default LEDSwitch;
