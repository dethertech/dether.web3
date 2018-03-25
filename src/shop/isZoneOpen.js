import { toNBytes } from '../utils';

/**
 * Is zone open
 * @param  {string} zoneId Zone id is a string of capitals characters
 * @return {boolean}       returns boolean if the zone is open
 */
function isZoneOpen(zoneId) {
  return new Promise(async (res, rej) => {
    try {
      if (!this.detherContract || !this.detherContract._address) {
        return rej(new Error('Invalid Dether contract address'));
      }

      if (!zoneId || !/^[A-Z]{2}$/.test(zoneId)) {
        return rej(new Error('Invalid zone ID'));
      }

      const isopen = await this.detherContract
        .methods
        .openedCountryShop(`0x${toNBytes(zoneId, 2)}`)
        .call();

      return res(isopen);
    } catch (e) {
      return rej(e);
    }
  });
}

export default isZoneOpen;
