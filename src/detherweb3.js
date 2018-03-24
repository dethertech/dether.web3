/* global window */
import Web3 from 'web3';

import { getAddress } from './wallet';
import { getNetwork } from './utils';

/**
 * [DetherWeb3 description]
 * @constructor
 */
class DetherWeb3 {
  constructor() {
    if (!window || !window.web3) throw new Error('web3 is undefined');

    this.provider = window.web3 && window.web3.currentProvider;

    if (typeof this.provider === 'undefined') throw new Error('Invalid provider');

    this.web3js = new Web3(this.provider);

    if (typeof this.web3js === 'undefined') throw new Error('Invalid web3js instance');
  }
}

/*
  Wallet
 */
DetherWeb3.prototype.getAddress = getAddress;

/*
  Utils
 */
DetherWeb3.prototype.getNetwork = getNetwork;


export default DetherWeb3;
