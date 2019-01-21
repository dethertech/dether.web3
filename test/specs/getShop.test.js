/* global describe it */
import { expect } from 'chai';

import detherWeb3 from '../../src';

describe('dether web3 get shop', () => {
  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getShop();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should get the shop', async () => {
    try {
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const shop = await detherWeb3.getShop();
      expect(shop).to.equal(null);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
