/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 isSmsReg', () => {
  let detherWeb3;
  it('should get true if user registered', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const isSms = await detherWeb3.isSmsReg();
      expect(isSms).to.equal(false);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
