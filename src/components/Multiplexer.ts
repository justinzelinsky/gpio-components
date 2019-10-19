import { Gpio, BinaryValue } from 'onoff';

import { getBinaryValue } from 'components/utils';

type SelectStates = {
  [key: number]: BinaryValue;
};

export type OnInterruptCallback = (switchIndex: number) => void;

export default class Multiplexer {
  input: Gpio;
  outputs: Gpio[];
  onInterrupt: OnInterruptCallback;
  timeoutId: number | undefined;
  numSwitches: number;

  constructor(
    inputPin: number,
    outputPins: number[],
    numSwitches: number,
    onInterrupt: OnInterruptCallback
  ) {
    this.input = new Gpio(inputPin, 'in');
    this.outputs = outputPins.map(pin => new Gpio(pin, 'out'));
    this.onInterrupt = onInterrupt;
    this.numSwitches = numSwitches;
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

  cleanUp() {
    clearTimeout(this.timeoutId);
    this.input.unexport();
    this.outputs.forEach(output => output.unexport());
  }
}
