import DetherCore from 'dethercontract/contracts/DetherCore.json';
import web3Abi from 'web3-eth-abi';

import { overloadedTransferAbi } from '../constants';
import { shopToContract } from '../utils';

/**
 * Add shop on the smart contract
 * @param {object} shop Shop information
 */
function addShop(shop) {
  return new Promise(async (res, rej) => {
    try {
      if (!this.dthContract || !this.dthContract._address) {
        return rej(new Error('Invalid Dether contract address'));
      }

      if (!this.address) return rej(new Error('Invalid ethereum address'));

      const hexShop = shopToContract(shop);
      const transferMethodTransactionData = web3Abi.encodeFunctionCall(
        overloadedTransferAbi,
        [
          DetherCore.networks[this.networkId].address,
          100,
          hexShop,
        ],
      );

      return res(await this.web3js.eth
        .sendTransaction({
          from: this.address,
          to: this.dthContract.networks[this.networkId].address,
          data: transferMethodTransactionData,
          value: 0,
          gas: 400000,
        }));
    } catch (e) {
      return rej(new TypeError(`Invalid shop transaction: ${e.message}`));
    }
  });
}

export default addShop;
