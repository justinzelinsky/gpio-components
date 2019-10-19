import LED from './LED';
import Switch, { SwitchOptions } from './Switch';
export default class LEDSwitch {
    led: LED;
    switch: Switch;
    constructor(ledPin: number, switchPin: number, onPress: Function, switchOptions?: SwitchOptions);
    watch(): void;
    isOn(): boolean;
    cleanUp(): void;
}
