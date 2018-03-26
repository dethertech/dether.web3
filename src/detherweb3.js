/* global window */
import Web3 from 'web3';

import { isSmsReg } from './sms';

import { getTransactionStatus } from './transactions';

import {
  getZonePrice,
  isZoneOpen,
  getShop,
  deleteShop,
  addShop,
} from './shop';

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
      this.address = await getAddress(this.web3js) || null;
      // TODO: resolve network problem
      // this.networkId = await this.web3js.eth.net.getId();
      this.networkId = '42';
      // TODO: not working on mainnet, invalid address ?
      this.smsContract = await getSmsContract(this.web3js, this.networkId);
      this.dthContract = await getDthContract(this.web3js, this.networkId);
      this.detherContract = await getDetherContract(this.web3js, this.networkId);
    } catch (e) {
      throw new Error(e);
    }
  }

  // Getters

  /**
   * Network Id
   * @return {string} return the network Id
   */
  get network() {
    return this.networkId;
  }

  /**
   * ethereum address
   * @return {string} return the user ethereum address
   */
  get ethAddress() {
    return this.address;
  }

  /**
   * Is Web3 on browser
   * @return {Boolean} returns a boolean if metamask is installed on user browser
   */
  get isWeb3() {
    return this.provider !== null;
  }

  /**
   * Is connected
   * @return {Boolean} returns a boolean if the user is connected to metamask
   */
  get isConnected() {
    return this.address !== null;
  }
}

DetherWeb3.prototype.getBalance = getBalance;

DetherWeb3.prototype.isSmsReg = isSmsReg;

DetherWeb3.prototype.getZonePrice = getZonePrice;

DetherWeb3.prototype.getTransactionStatus = getTransactionStatus;

DetherWeb3.prototype.isZoneOpen = isZoneOpen;

DetherWeb3.prototype.getShop = getShop;

DetherWeb3.prototype.deleteShop = deleteShop;

DetherWeb3.prototype.addShop = addShop;

export default DetherWeb3;
