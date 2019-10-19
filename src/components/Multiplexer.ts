import { Gpio } from 'onoff';

import { getBinaryValue } from 'components/utils';

type SelectStates = {
  [key: number]: number;
};

export default class Multiplexer {
  input: Gpio;
  outputs: Gpio[];
  onInterrupt: Function;
  timeoutId: number | undefined;
  numSwitches: number;

  constructor(
    inputPin: number,
    outputPins: number[],
    numSwitches: number,
    onInterrupt: Function
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
      previousSelectStates[i] = 1;
    }

    let selectIndex = 0;

    const checkSwitches = () => {
      Promise.all(
        outputs.map((output, idx) => {
          output.write(getBinaryValue((selectIndex >> idx) % 2));
        })
      ).then(() => {
        const selectState = input.readSync();
        const previousSelectState = previousSelectStates[selectIndex];

        if (selectState !== previousSelectState && selectState === 0) {
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
