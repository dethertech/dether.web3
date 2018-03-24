/* global window */
import Web3 from 'web3';

/**
 * DetherWeb3
 */
function Providers() {
  if (!window || !window.web3) throw new Error('web3 is undefined');

  this.provider = window.web3 && window.web3.currentProvider;

  if (typeof this.provider === 'undefined') throw new Error('Invalid provider');

  this.web3js = new Web3(this.provider);

  if (typeof this.web3js === 'undefined') throw new Error('Invalid web3js instance');
}

export default Providers;
