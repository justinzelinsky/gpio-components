import { Edge, Gpio } from 'onoff';
export declare type SwitchOptions = {
    debounceTimeout?: number;
    edge?: Edge;
};
export declare const defaultSwitchOptions: SwitchOptions;
export default class Switch {
    switch: Gpio;
    onPress: Function;
    constructor(pin: number, onPress: Function, switchOptions?: SwitchOptions);
    watch(): void;
    cleanUp(): void;
}
