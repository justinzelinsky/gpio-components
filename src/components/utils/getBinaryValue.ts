import { Gpio } from 'onoff';

const getBinaryValue = (value: number) => (value ? Gpio.HIGH : Gpio.LOW);

export default getBinaryValue;
