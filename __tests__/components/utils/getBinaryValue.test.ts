import { Gpio } from 'onoff';

import { getBinaryValue } from '../../../src/components/utils';

describe('test getBinaryValue', () => {
  it('should should return the proper binary value', () => {
    const value = getBinaryValue(1);
    expect(value).toEqual(Gpio.HIGH);
    const value2 = getBinaryValue(0);
    expect(value2).toEqual(Gpio.LOW);
  });
});
