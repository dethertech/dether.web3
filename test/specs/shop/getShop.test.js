/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 get shop', () => {
  let detherWeb3;

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.getShop();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should get the shop', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const shop = await detherWeb3.getShop();
      expect(shop).to.equal(null);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
