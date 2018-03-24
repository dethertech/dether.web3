/* global window */
import Web3 from 'web3';

import { getAddress } from './wallet';

import {
  getSmsContract,
  getDthContract,
  getDetherContract,
} from './contracts';

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

  async loadContract() {
    try {
      // TODO: resolve network problem
      this.networkId = await this.web3js.eth.net.getId();
      // this.networkId = '42';
      this.getSmsContract = await getSmsContract(this.web3js, this.networkId);
      this.getDthContract = await getDthContract(this.web3js, this.networkId);
      this.getDetherContract = await getDetherContract(this.web3js, this.networkId);
      this.address = await getAddress(this.web3js);
    } catch (e) {
      throw new Error(e);
    }
  }

  get network() {
    return this.networkId;
  }

  get ethAddress() {
    return this.address;
  }
}

DetherWeb3.prototype.getBalance = async function getBalance() {
  return new Promise(async (res, rej) => {
    try {
      this.web3js.eth.getBalance(this.address).then(async (result, error) => {
        if (!error) {
          res({
            eth: parseFloat(this.web3js.utils.fromWei(result, 'ether')),
            // TODO: error test
            dth: parseFloat(this.web3js.utils.fromWei(
              await this.getDthContract
              .methods.balanceOf('0805fDe3043251af5F86dE007f008d2F5CF8D2bB').call(),
              'ether',
            )),
          });
        } else {
          rej(new TypeError(`Invalid shop profile: ${error.message}`));
        }
      });
    } catch (e) {
      rej(e);
    }
  });
};
