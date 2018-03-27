/* global describe it */
import { expect } from 'chai';

import { shopFromContract } from '../../../src/utils';
import DetherWeb3 from '../../../src';

describe('dether web3 validateShop', () => {
  it('should throw a error', async () => {
    try {
      await shopFromContract();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should res a formated shop', async () => {
    try {
      const data = {
        lat: 4885661,
        lng: 235222,
        countryId: '0x4652',
        postalCode: '0x37353030340000000000000000000000',
        cat: '0x64666200000000000000000000000000',
        name: '0x66646200000000000000000000000000',
        description: '0x6473676466676473736467736467647367647367647367647300000000000000',
        opening: '0x714b714b3030714b714b300000000000',
      };

      const detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      const newShop = await shopFromContract(data, detherWeb3.web3js);

      expect(newShop.lat).to.equal(48.85661);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
