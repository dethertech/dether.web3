/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 is zone open', () => {
  let detherWeb3;

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.isZoneOpen();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.isZoneOpen('erg');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.isZoneOpen('11');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.isZoneOpen('as');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();

      await detherWeb3.isZoneOpen('aE');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should return true if FR is open', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      // TODO: not working invalid ABI
      const isSms = await detherWeb3.isZoneOpen('FR');
      expect(isSms).to.equal(true);
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
