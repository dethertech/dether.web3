import Web3 from 'web3';
import { validateTeller } from '../constants';

/**
 * Formate teller data
 * @param  {object} rawTeller teller data
 * @return {object}         formated teller data
 */
const tellerFromContract = (rawTeller) =>
  new Promise(async (res, rej) => {
    try {
      if (!rawTeller) return rej(new Error('Invalid args'));

      const newTeller = {
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
        await validateTeller(newTeller);
        return res(newTeller);
      } catch (e) {
        throw new TypeError(`Invalid teller profile: ${e.message}`);
      }
  });

export default tellerFromContract;