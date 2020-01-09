import { Edge, Options } from 'onoff';
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
declare class Switch {
    private switch;
    private onPress;
    constructor(config: SwitchConfig);
    watch(): void;
    cleanUp(): void;
}
export default Switch;
