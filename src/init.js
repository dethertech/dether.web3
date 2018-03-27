import {
  getSmsContract,
  getDthContract,
  getDetherContract,
} from './contracts';

import { getAddress } from './wallet';


function init() {
  return new Promise(async (res, rej) => {
    try {
      this.address = await getAddress(this.web3js) || null;

      // TODO: resolve network problem
      this.networkId = '42';
      // this.networkId = await this.web3js.eth.net.getId();

      // TODO: not working on mainnet, invalid address ?
      this.smsContract = await getSmsContract(this.web3js, this.networkId);
      this.dthContract = await getDthContract(this.web3js, this.networkId);
      this.detherContract = await getDetherContract(this.web3js, this.networkId);

      this.classInit = true;
      res();
    } catch (e) {
      rej(new Error(e));
    }
  });
}

export default init;
