import { Edge, Gpio } from 'onoff';
export declare type SwitchOptions = {
    debounceTimeout?: number;
    edge?: Edge;
};
export declare type SwitchConfig = {
    onPress: Function;
    pin: number;
    switchOptions?: SwitchOptions;
};
export declare const defaultSwitchOptions: SwitchOptions;
export default class Switch {
    switch: Gpio;
    onPress: Function;
    constructor(config: SwitchConfig);
    watch(): void;
    cleanUp(): void;
}
