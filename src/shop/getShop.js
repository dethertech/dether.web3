import { shopFromContract } from '../utils';

/**
 * Get get from smart contract
 * @return {object} shop informations
 */
function getShop() {
  return new Promise(async (res, rej) => {
    try {
      if (!this.detherContract || !this.detherContract._address) {
        return rej(new Error('Invalid Dether contract address'));
      }

      if (!this.address) return rej(new Error('Invalid ethereum address'));

      const rawShop = await this.detherContract
        .methods
        .getShop(this.address)
        .call();

      const id = this.web3js.utils.hexToUtf8(rawShop[2]).replace(/\0/g, '');

      if (!id) return res(null);

      return res(Object.assign(
        {},
        await shopFromContract(rawShop, this.web3js),
        {
          ethAddress: this.address,
        },
      ));
    } catch (e) {
      return rej(new TypeError(`Invalid shop profile: ${e.message}`));
    }
  });
}

export default getShop;
