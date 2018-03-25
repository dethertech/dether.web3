/* global describe it */
import { expect } from 'chai';
// import sinon from 'sinon';
import Chaithereum from 'chaithereum';

import DetherWeb3 from '../../src';

const chaithereum = new Chaithereum();

describe('dether web3', () => {
  describe('instanciation', () => {
    let detherWeb3;

    it('should throw a web3 error', async () => {
      try {
        detherWeb3 = await new DetherWeb3();
      } catch (e) {
        expect(e).to.not.equal(null);
      }
    });

    global.window = {
      web3: 'web3',
    };

    it('should throw a provider error', async () => {
      try {
        detherWeb3 = await new DetherWeb3();
      } catch (e) {
        expect(e).to.not.equal(null);
      }
    });

    global.window = {
      web3: new chaithereum.Web3(chaithereum.provider),
    };

    it('should instancite web3js', async () => {
      try {
        detherWeb3 = await new DetherWeb3();
        expect(detherWeb3).to.not.equal(null);
      } catch (e) {
        expect(e).to.equal(null);
      }
    });


// Getters
     it('should call all getters', async () => {
      try {
        detherWeb3 = await new DetherWeb3();

        const address = await detherWeb3.ethAddress;
        /* eslint-disable-next-line */
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
});
