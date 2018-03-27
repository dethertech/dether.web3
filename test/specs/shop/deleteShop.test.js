/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 delete shop', () => {
  let detherWeb3;

  it('should delete shop', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const shop = await detherWeb3.deleteShop();
      expect(shop.blockNumber !== 0).to.equal(true);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
