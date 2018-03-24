/* global window */
import Web3 from 'web3';

import {
  getAddress,
  getBalance,
} from './wallet';

import {
  getSmsContract,
  getDthContract,
  getDetherContract,
} from './contracts';

/**
 * DetherWeb3
 */
class DetherWeb3 {
  constructor() {
    if (!window || !window.web3) throw new Error('web3 is undefined');

    this.provider = window.web3 && window.web3.currentProvider;

    if (typeof this.provider === 'undefined') throw new Error('Invalid provider');

    this.web3js = new Web3(this.provider);

    if (typeof this.web3js === 'undefined') throw new Error('Invalid web3js instance');

    return new Promise(async (res, rej) => {
      try {
        await this.loadContract();
        res(this);
      } catch (e) {
        rej(e);
      }
    });
  }

  // Set contract instance
  async loadContract() {
    try {
      // TODO: resolve network problem
      // this.networkId = await this.web3js.eth.net.getId();
      this.networkId = '42';
      this.getSmsContract = await getSmsContract(this.web3js, this.networkId);
      this.getDthContract = await getDthContract(this.web3js, this.networkId);
      this.getDetherContract = await getDetherContract(this.web3js, this.networkId);
      this.address = await getAddress(this.web3js);
    } catch (e) {
      throw new Error(e);
    }
  }

  // Getters
  get network() {
    return this.networkId;
  }

  get ethAddress() {
    return this.address;
  }
}

DetherWeb3.prototype.getBalance = getBalance;

export default DetherWeb3;
