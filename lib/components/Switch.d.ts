import { Edge, Gpio, Options } from 'onoff';
export declare type SwitchCallback = () => void;
export declare type SwitchOptions = Options & {
    edge?: Edge;
};
export declare type SwitchConfig = {
    onPress: SwitchCallback;
    pin: number;
    switchOptions?: SwitchOptions;
};
export declare const defaultSwitchOptions: SwitchOptions;
export default class Switch {
    switch: Gpio;
    onPress: SwitchCallback;
    constructor(config: SwitchConfig);
    watch(): void;
    cleanUp(): void;
}
