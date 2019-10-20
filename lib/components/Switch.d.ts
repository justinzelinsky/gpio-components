import { Edge, Gpio, Options } from 'onoff';
export declare type SwitchOptions = Options & {
    edge?: Edge;
};
export declare type SwitchConfig = {
    onPress: SwitchOnPressCallback;
    pin: number;
    switchOptions?: SwitchOptions;
};
export declare const defaultSwitchOptions: SwitchOptions;
export declare type SwitchOnPressCallback = () => void;
export default class Switch {
    switch: Gpio;
    onPress: SwitchOnPressCallback;
    constructor(config: SwitchConfig);
    watch(): void;
    cleanUp(): void;
}
