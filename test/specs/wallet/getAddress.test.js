/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getAddress', () => {
  let detherWeb3;
  it('should get eth address', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      const addr = detherWeb3.ethAddress;
      /* eslint-disable-next-line */
      expect(/^0x[a-fA-F0-9]{40}$/.test(addr)).to.be.true;
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
