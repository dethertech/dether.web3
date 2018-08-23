import Web3 from 'web3';
import { intTo5bytes, intTo2bytes, intTobytes, toNBytes } from './intToBytes';
/**
 * Formate teller data
 * @param  {object} rawTeller teller data
 * @return {object}         formated teller data
 */

// TODO: include shop formatters and re-write
// TODO: validation

const sellPointToContract = (rawteller) => {
  //   const validation = validateSellPoint(rawSellPoint);
  //   if (validation.error) throw new TypeError(validation.msg);
  try {
    const lat = intTo5bytes(parseFloat(rawteller.lat) * 100000);
    const lng = intTo5bytes(parseFloat(rawteller.lng) * 100000);
    const currency = intTobytes(parseInt(rawteller.currencyId));
    const avatar = intTobytes(parseInt(rawteller.avatarId));
    const rates = intTo2bytes(parseFloat(rawteller.rates) * 10);
    const buyer = rawteller.buyer ? '01' : '00';
    const buyRates = intTo2bytes(parseFloat(rawteller.buyRates) * 10);
    const hexteller = `0x32${lat}${lng}${toNBytes(rawteller.countryId, 2)}${toNBytes(rawteller.postalCode, 16)}${avatar}${currency}${toNBytes(rawteller.messenger, 16)}${rates}${buyer}${buyRates}`;
    console.log(`hexTeller created: ${hexteller}`)
    return hexteller;
  } catch (e) {
    throw new TypeError(`Invalid teller profile: ${e.message}`);
  }
};


const sellPointFromContract = (rawTeller) => {
  // const validation = validateShop(rawShop);
    // if (validation.error) throw new TypeError(validation.msg);
  try {
    return {
      lat: rawTeller[0] / 100000,
      lng: rawTeller[1] / 100000,
      countryId: Web3.utils.hexToUtf8(rawTeller[2]).replace(/\0/g, ''),
      postalCode: Web3.utils.hexToUtf8(rawTeller[3]).replace(/\0/g, ''),
      currencyId: rawTeller[4],
      messenger: Web3.utils.hexToUtf8(rawTeller[5]).replace(/\0/g, ''),
      avatarId: rawTeller[6],
      rates: rawTeller[7] / 10,
      balance: Web3.utils.fromWei(rawTeller[8], 'ether'),
      online: rawTeller[9],
      buyer: rawTeller[10] ? rawTeller[10] : rawTeller[10],
      buyRates: rawTeller[11] ? rawTeller[11] / 10 : 2,
    };
  } catch (e) {
      throw new TypeError(`Invalid teller profile: ${e.message}`);
  }
}; //       await validateShop(newShop);

module.exports = { sellPointFromContract, sellPointToContract };