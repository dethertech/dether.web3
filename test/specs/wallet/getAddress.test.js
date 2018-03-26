/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getAddress', () => {
  let detherWeb3;
  it('should get eth address', async () => {
    try {
      detherWeb3 = await new DetherWeb3();
      const addr = detherWeb3.ethAddress;
      /* eslint-disable-next-line */
      expect(/^0x[a-fA-F0-9]{40}$/.test(addr)).to.be.true;
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
