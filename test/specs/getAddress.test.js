/* global describe it */
import { expect } from 'chai';

import detherWeb3 from '../../src';

describe('dether web3 getAddress', () => {
  it('should get eth address', async () => {
    try {
      await detherWeb3.init();
      const addr = detherWeb3.ethAddress;
      /* eslint-disable-next-line */
      expect(/^0x[a-fA-F0-9]{40}$/.test(addr)).to.be.true;
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
