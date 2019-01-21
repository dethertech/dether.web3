import { validateShop } from '../constants';

/**
 * Formated shop value from smart contract
 * @param  {object} rawShop shop from smart contract
 * @param  {object} web3js  web3
 * @return {object}         formated shop
 */
const shopFromContract = (rawShop, web3js) =>
  new Promise(async (res, rej) => {
    try {
      if (!rawShop || !web3js) return rej(new Error('Invalid args'));

      const newShop = {
        lat: parseFloat(rawShop.lat) / 100000,
        lng: parseFloat(rawShop.lng) / 100000,
        countryId: web3js.utils.hexToUtf8(rawShop.countryId).replace(/\0/g, ''),
        postalCode: web3js.utils.hexToUtf8(rawShop.postalCode).replace(/\0/g, ''),
        cat: web3js.utils.hexToUtf8(rawShop.cat).replace(/\0/g, ''),
        name: web3js.utils.hexToUtf8(rawShop.name).replace(/\0/g, ''),
        description: web3js.utils.hexToUtf8(rawShop.description).replace(/\0/g, ''),
        opening: web3js.utils.hexToUtf8(rawShop.opening).replace(/\0/g, ''),
      };

      await validateShop(newShop);

      return res(newShop);
    } catch (e) {
      return rej(new Error(`Invalid shop profile: ${e.message}`));
    }
  });


export default shopFromContract;
