/* global describe it */
import { expect } from 'chai';

import ConvertBase from '../../../src/utils/convertBase';

describe('dether web3 ConvertBase', () => {
  it('should res Convert Base', async () => {
    try {
      const convert = new ConvertBase();

      const num = convert.dec2hex(18);

      expect(num).to.equal('12');
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
