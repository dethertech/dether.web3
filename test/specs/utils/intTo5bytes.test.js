/* global describe it */
import { expect } from 'chai';

import { intTo5bytes } from '../../../src/utils';

describe('dether web3 intTo5bytes', () => {
  it('should res intTo5bytes', async () => {
    try {
      const intPos = intTo5bytes(1234567);
      expect(intPos).to.equal('000012D687');

      const intNeg = intTo5bytes(-1234567);
      expect(intNeg).to.equal('010012D787');
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
