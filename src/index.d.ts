export type Options = {
  debounceTimeout?: number;
  activeLow?: boolean;
  reconfigureDirection?: boolean;
};

export class LED {
  constructor(pin: number);

  isOn(): boolean;

  on(): void;

  off(): void;

  cleanUp(): void;
}

export class LEDSwitch {
  constructor(
    ledPin: number,
    switchPin: number,
    onPress: (value: number) => void,
    switchOptions?: Options
  );

  watch(): void;

  isOn(): boolean;

  cleanUp(): void;
}

export class RotaryEncoder {
  constructor(
    pinA: number,
    pinB: number,
    onIncrement: Function,
    onDecrement: Function,
    onAlways: Function
  );

  watch(): void;

  cleanUp(): void;
}

export class SevenSegmentDisplay {
  constructor(
    pinZero: number,
    pinOne: number,
    pinTwo: number,
    pinThree: number
  );

  setDisplay(): Promise<void>;

  getBinaryRepresentation(): string;

  cleanUp(): void;
}

export class Switch {
  constructor(pin: number, onPress: Function, switchOptions?: Options);

  watch(): void;

  cleanUp(): void;
}
