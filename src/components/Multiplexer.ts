import { BinaryValue, Gpio } from 'onoff';

import { getBinaryValue } from 'components/utils';

type SelectStates = {
  [key: number]: BinaryValue;
};

export type MultiplexerConfig = {
  inputPin: number;
  numSwitches: number;
  onInterrupt: OnInterruptCallback;
  outputPins: number[];
};

export type OnInterruptCallback = (switchIndex: number) => void;

export default class Multiplexer {
  input: Gpio;
  numSwitches: number;
  onInterrupt: OnInterruptCallback;
  outputs: Gpio[];
  timeoutId: number | undefined;

  constructor(config: MultiplexerConfig) {
    const { inputPin, numSwitches, onInterrupt, outputPins } = config;

    this.input = new Gpio(inputPin, 'in');
    this.numSwitches = numSwitches;
    this.onInterrupt = onInterrupt;
    this.outputs = outputPins.map(pin => new Gpio(pin, 'out'));
  }

  watch(): void {
    const { input, numSwitches, outputs } = this;

    const previousSelectStates: SelectStates = {};
    for (let i = 0; i < numSwitches; i++) {
      previousSelectStates[i] = Gpio.HIGH;
    }

    let selectIndex: number = 0;

    const checkSwitches = () => {
      Promise.all(
        outputs.map((output, idx) => {
          output.write(getBinaryValue((selectIndex >> idx) % 2));
        })
      ).then(() => {
        const selectState: BinaryValue = input.readSync();
        const previousSelectState: BinaryValue =
          previousSelectStates[selectIndex];

        if (selectState !== previousSelectState && selectState === Gpio.LOW) {
          this.onInterrupt(selectIndex);
        }

        previousSelectStates[selectIndex] = selectState;
        selectIndex = (selectIndex + 1) % numSwitches;

        this.timeoutId = setTimeout(checkSwitches, 0);
      });
    };

    checkSwitches();
  }

  cleanUp(): void {
    clearTimeout(this.timeoutId);

    this.input.unexport();
    this.outputs.forEach(output => output.unexport());
  }
}
