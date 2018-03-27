/* global describe it */
import { expect } from 'chai';

import DetherWeb3 from '../../../src';

describe('dether web3 getTransactionStatus', () => {
  let detherWeb3;

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      await detherWeb3.getTransactionStatus();
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should throw a error', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      await detherWeb3.getTransactionStatus('ergerh');
    } catch (e) {
      expect(e).to.not.equal(null);
    }
  });

  it('should get transaction status', async () => {
    try {
      detherWeb3 = new DetherWeb3();
      await detherWeb3.init();
      const status = await detherWeb3.getTransactionStatus('0xa285341cb6b086eaea1bbd7cb3b25b4d31756b4c6bbf1028a4ee26262128cfd9');
      expect(status).to.equal('pending');
    } catch (e) {
      expect(e).to.equal(null);
    }
  });
});
