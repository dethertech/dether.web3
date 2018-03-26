import { toNBytes } from '../utils';

/**
 * Get zone price
 * @param  {string} zoneId Zone id is a string of capitals characters
 * @return {number}        Licence price
 */
function getZonePrice(zoneId) {
  return new Promise(async (res, rej) => {
    try {
      if (!this.detherContract || !this.detherContract._address) {
        return rej(new Error('Invalid Dether contract address'));
      }

      if (!zoneId || !/^[A-Z]{2}$/.test(zoneId)) {
        return rej(new Error('Invalid zone ID'));
      }

      const price = await this.detherContract
        .methods
        .licenceShop(`0x${toNBytes(zoneId, 2)}`)
        .call();

      return res(this.web3js.utils.fromWei(price));
    } catch (e) {
      return rej(e);
    }
  });
}

export default getZonePrice;
