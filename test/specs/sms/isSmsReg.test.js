/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 isSmsReg', () => {
  let detherWeb3;
  it('should get true if user registered', async () => {
    try {
      detherWeb3 = await new DetherWeb3();
      // TODO: not working invalid ABI
      const isSms = await detherWeb3.isSmsReg();
      expect(isSms).to.equal(false);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
