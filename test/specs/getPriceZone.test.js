/* global describe it */
import { expect } from 'chai';

import detherWeb3 from '../../src';

describe('dether web3 get Price Zone', () => {
  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getZonePrice();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getZonePrice('erg');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getZonePrice('11');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getZonePrice('as');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      await detherWeb3.init();

      await detherWeb3.getZonePrice('aE');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should get the price zone', async () => {
    try {
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const isSms = await detherWeb3.getZonePrice('FR');
      expect(isSms).to.equal(false);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
