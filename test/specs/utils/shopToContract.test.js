/* global describe it */
import { expect } from 'chai';

import { shopToContract } from '../../../src/utils';

describe('dether web3 shopToContract', () => {
  it('should res a formated shop', async () => {
    try {
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


      const newShop = await shopToContract(data);

      expect(newShop).to.equal('0x31000001e078000012ce10474933343538340000000000000000000000636174636800000000000000000000006e616d6500000000000000000000000064657363000000000000000000000000000000000000000000000000000000003030303030303000000000000000000031');
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
