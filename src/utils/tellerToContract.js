import { intTo5bytes, intTo2bytes, intTobytes, toNBytes } from './intToBytes';
import { validateTeller } from '../constants';

/**
 * Formate teller data
 * @param  {object} rawTeller teller data
 * @return {object}         formated teller data
 */
const tellerToContract = (rawTeller) => {
    const validation = validateTeller(rawTeller);
    if (validation.error) throw new TypeError(validation.msg);
    try {
      const lat = intTo5bytes(parseFloat(rawTeller.lat) * 100000);
      const lng = intTo5bytes(parseFloat(rawTeller.lng) * 100000);
      const currency = intTobytes(parseInt(rawTeller.currencyId));
      const avatar = intTobytes(parseInt(rawTeller.avatarId));
      const rates = intTo2bytes(parseFloat(rawTeller.rates) * 10);
      const buyer = rawTeller.buyer ? '01' : '00';
      const buyRates = intTo2bytes(parseFloat(rawTeller.buyRates) * 10);
      const hexteller = `0x32${lat}${lng}${toNBytes(rawTeller.countryId, 2)}${toNBytes(rawTeller.postalCode, 16)}${avatar}${currency}${toNBytes(rawTeller.messenger, 16)}${rates}${buyer}${buyRates}`;
      return hexteller;
    } catch (e) {
      throw new TypeError(`Invalid teller profile: ${e.message}`);
    }
};

export default tellerToContract;