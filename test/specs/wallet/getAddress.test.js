/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getAddress', () => {
  describe('instanciation', () => {
    let detherWeb3;
    it('should instancite get eth address', async () => {
      try {
        detherWeb3 = new DetherWeb3();
        const addr = await detherWeb3.getAddress();
        /* eslint-disable-next-line */
        expect(/^0x[a-fA-F0-9]{40}$/.test(addr)).to.be.true;
      } catch (e) {
        expect(e).to.equal(null);
      }
    });
  });
});
