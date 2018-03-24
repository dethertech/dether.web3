/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getAddress', () => {
  describe('instanciation', () => {
    let detherWeb3;
    it('should instancite get eth address', async () => {
      try {
        detherWeb3 = new DetherWeb3();
        const network = await detherWeb3.getNetwork();
        expect(network).to.not.equal(null);
      } catch (e) {
        expect(e).to.equal(null);
      }
    });
  });
});
