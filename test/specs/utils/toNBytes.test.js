/* global describe it */
import { expect } from 'chai';

import { toNBytes } from '../../../src/utils';

describe('dether web3 toNBytes', () => {
  it('should return bytes from string', async () => {
    try {
      const bytes = toNBytes('FR', 2);
      expect(bytes).to.equal('4652');
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
