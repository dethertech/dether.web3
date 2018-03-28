/* global describe it */
import { expect } from 'chai';

import detherWeb3 from '../../src';

describe('dether web3 delete shop', () => {
  it('should delete shop', async () => {
    try {
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const shop = await detherWeb3.deleteShop();
      expect(shop.blockNumber !== 0).to.equal(true);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
