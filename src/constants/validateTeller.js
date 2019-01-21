/**
 * Validation teller
 * @param  {object} teller teller info from smartcontract
 */

const hasValue = (a) => typeof a === 'undefined' ? false : a === null ? false : true
// warning - checking for !something rejects on 0
const validateTeller = (teller) =>
  new Promise((res, rej) => {
    if (!teller || typeof teller !== 'object') {
      return rej(new Error('Invalid args'));
    }
    if (!hasValue(teller.lat) || Number.isNaN(teller.lat) || teller.lat > 90 || teller.lat < -90) {
      return rej(new Error('Invalid latitude'));
    }
    if (!hasValue(teller.lng) || Number.isNaN(teller.lng) || teller.lng > 180 || teller.lng < -180) {
      return rej(new Error('Invalid longitude'));
    }
    if (!hasValue(teller.countryId)) {
      return rej(new Error('Invalid country ID'));
    }
    if (!hasValue(teller.postalCode) || typeof teller.postalCode !== 'string' || teller.postalCode.length > 16) {
      return rej(new Error('Invalid postal code'));
    }
    if (!hasValue(teller.avatarId) || parseInt(teller.avatarId) < 0 || parseInt(teller.avatarId) > 20) {
      return rej(new Error('Invalid avatar ID'));
    }
    if (!hasValue(teller.currencyId)) {
      return rej(new Error('Invalid currency ID'));
    }
    if (!hasValue(teller.messenger) || typeof teller.messenger !== 'string' || teller.messenger.length < 2 || teller.messenger.length > 30) {
      return rej(new Error('Invalid messenger'));
    }
    if (!hasValue(teller.rates) || teller.rates <= 0 || teller.rates > 100) {
      return rej(new Error('Invalid rates'));
    }
    if (!hasValue(teller.buyer) || typeof teller.buyer !== 'boolean') {
      return rej(new Error('Invalid buyer'));
    }
    if (!hasValue(teller.buyRates) || Number.isNaN(teller.buyRates)) {
      return rej(new Error('Invalid buy rates'));
    }
    return res();
  });

export default validateTeller;
