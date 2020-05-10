import { BinaryValue, Gpio } from 'onoff';

function getBinaryValue(value: number): BinaryValue {
  return value ? Gpio.HIGH : Gpio.LOW;
}

export default getBinaryValue;
