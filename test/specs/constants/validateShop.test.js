/* global describe it */
import { expect } from 'chai';

import { validateShop } from '../../../src/constants';

describe('dether web3 validateShop', () => {
  it('should throw a error', async () => {
    try {
      await validateShop();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should res whitout error', async () => {
    try {
      await validateShop({});
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
