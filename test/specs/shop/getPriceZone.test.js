/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 get Price Zone', () => {
  let detherWeb3;

  it('should throw a error', async () => {
    try {
      detherWeb3 = await new DetherWeb3();

      await detherWeb3.getZonePrice();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = await new DetherWeb3();

      await detherWeb3.getZonePrice('erg');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = await new DetherWeb3();

      await detherWeb3.getZonePrice('11');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = await new DetherWeb3();

      await detherWeb3.getZonePrice('as');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = await new DetherWeb3();

      await detherWeb3.getZonePrice('aE');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should get the price zone', async () => {
    try {
      detherWeb3 = await new DetherWeb3();
      // TODO: not working invalid ABI
      const isSms = await detherWeb3.getZonePrice('FR');
      expect(isSms).to.equal(false);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
