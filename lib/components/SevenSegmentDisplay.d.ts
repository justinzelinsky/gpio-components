declare type SevenSegmentDisplayConfig = {
    pinZero: number;
    pinOne: number;
    pinTwo: number;
    pinThree: number;
};
declare class SevenSegmentDisplay {
    private zero;
    private one;
    private two;
    private three;
    constructor(config: SevenSegmentDisplayConfig);
    setDisplay(displayNumber: number): Promise<[void, void, void, void]>;
    getValue(): number;
    getBinaryValue(): string;
    cleanUp(): void;
}
export default SevenSegmentDisplay;
