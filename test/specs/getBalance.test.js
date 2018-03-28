/* global describe it */
import { expect } from 'chai';

import detherWeb3 from '../../src';

describe('dether web3 getBalance', () => {
  it('should get eth and dth balance', async () => {
    try {
      await detherWeb3.init();
      const balance = await detherWeb3.getBalance();
      expect(balance.eth > 0).to.equal(true);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
