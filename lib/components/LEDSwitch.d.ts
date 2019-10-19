import LED from './LED';
import Switch, { SwitchOptions } from './Switch';
export declare type OnPressCallback = (isOn: boolean) => void;
export declare type LEDSwitchConfig = {
    ledPin: number;
    onPress: OnPressCallback;
    switchOptions?: SwitchOptions;
    switchPin: number;
};
export default class LEDSwitch {
    led: LED;
    switch: Switch;
    constructor(config: LEDSwitchConfig);
    watch(): void;
    isOn(): boolean;
    cleanUp(): void;
}
