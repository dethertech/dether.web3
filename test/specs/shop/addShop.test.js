/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 add shop', () => {
  let detherWeb3;

  it('should add shop', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      const data = {
        lat: 1.23,
        lng: 12.324,
        countryId: 'GI',
        postalCode: '34584',
        cat: 'catch',
        name: 'name',
        description: 'desc',
        opening: '0000000',
      };

      // TODO: not working invalid ABI
      const shop = await detherWeb3.addShop(data);
      expect(shop.blockNumber !== 0).to.equal(true);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
