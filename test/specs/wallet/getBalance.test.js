/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getBalance', () => {
  let detherWeb3;
  it('should get eth and dth balance', async () => {
    try {
      detherWeb3 = await new DetherWeb3();
      const balance = await detherWeb3.getBalance();
      expect(balance.eth).to.equal(100);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
