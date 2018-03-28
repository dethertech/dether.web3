/* eslint-disable no-unused-expressions */
/* global describe it */
import { expect } from 'chai';
// import sinon from 'sinon';
import Chaithereum from 'chaithereum';

import detherWeb3 from '../../src';

const chaithereum = new Chaithereum();

describe('dether web3', () => {
  describe('instanciation', () => {
    it('should throw a web3 error', async () => {
      try {
        await detherWeb3.init();
      } catch (e) {
        expect(e).to.not.equal(null);
      }
    });

    global.window = {
      web3: 'web3',
    };

    it('should throw a provider error', async () => {
      try {
        await detherWeb3.init();
      } catch (e) {
        expect(e).to.not.equal(null);
      }
    });

    global.window = {
      web3: new chaithereum.Web3(chaithereum.provider),
    };

    it('should instancite web3js', async () => {
      try {
        await detherWeb3.init();
        expect(detherWeb3).to.not.equal(null);
      } catch (e) {
        expect(e).to.equal(null);
      }
    });

    it('should instancite with loadContract', async () => {
      try {
        await detherWeb3.init();

        expect(detherWeb3).to.not.equal(null);
        expect(/^0x[a-fA-F0-9]{40}$/.test(detherWeb3._address)).to.be.true;
        expect(/^0x[a-fA-F0-9]{40}$/.test(detherWeb3._smsContract._address)).to.be.true;
        expect(/^0x[a-fA-F0-9]{40}$/.test(detherWeb3._dthContract._address)).to.be.true;
        expect(/^0x[a-fA-F0-9]{40}$/.test(detherWeb3._detherContract._address)).to.be.true;
        expect(detherWeb3._networkId).to.equal('42');
      } catch (e) {
        expect(e).to.equal(null);
      }
    });

    // Getters
     it('should call all getters', async () => {
      try {
        await detherWeb3.init();

        const address = await detherWeb3.ethAddress;
        expect(/^0x[a-fA-F0-9]{40}$/.test(address)).to.be.true;

        const networkId = await detherWeb3.network;
        expect(networkId).to.equal('42');

        const isWeb3 = await detherWeb3.isWeb3;
        expect(isWeb3).to.equal(true);

        const isConnected = await detherWeb3.isConnected;
        expect(isConnected).to.equal(true);
      } catch (e) {
        expect(e).to.equal(null);
      }
    });
  });

  describe('is Ready', () => {
    it('should be ready', async () => {
      await detherWeb3.init();
      expect(detherWeb3.isReady()).to.equal(true);
    });
  });
});
