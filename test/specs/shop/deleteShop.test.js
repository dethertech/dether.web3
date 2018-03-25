/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 delete shop', () => {
  let detherWeb3;

  it('should delete shop', async () => {
    try {
      detherWeb3 = await new DetherWeb3();
      // TODO: not working invalid ABI
      const shop = await detherWeb3.deleteShop();
      expect(shop.blockNumber).to.equal(1);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
