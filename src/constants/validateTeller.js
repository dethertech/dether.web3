/**
 * Validation teller
 * @param  {object} teller teller info from smartcontract
 */
const validateTeller = (teller) =>
  new Promise((res, rej) => {
    if (!teller || typeof teller !== 'object') {
      return rej(new Error('Invalid args'));
    }
    if (!teller.lat || Number.isNaN(teller.lat) || teller.lat > 90 || teller.lat < -90) {
      return rej(new Error('Invalid latitude'));
    }
    if (!teller.lng || Number.isNaN(teller.lng) || teller.lng > 180 || teller.lng < -180) {
      return rej(new Error('Invalid longitude'));
    }
    if (!teller.countryId || teller.countryId.length !== 2) {
      return rej(new Error('Invalid country ID'));
    }
    if (!teller.postalCode || typeof teller.postalCode !== 'string' || teller.postalCode.length > 16) {
      return rej(new Error('Invalid postal code'));
    }
    if (!teller.avatarId || parseInt(teller.avatarId) <= 0 || parseInt(teller.avatarId) >= 20) {
      return rej(new Error('Invalid avatar ID'));
    }
    if (!teller.currencyId) {
      return rej(new Error('Invalid currency ID'));
    }
    if (!teller.messenger || typeof teller.messenger !== 'string' || teller.messenger.length < 2 || teller.messenger.length > 30) {
      return rej(new Error('Invalid messenger'));
    }
    if (!teller.rates || teller.rates <= 0 || teller.rates > 100) {
      return rej(new Error('Invalid rates'));
    }
    if (teller.buyer === undefined || teller.buyer === null || typeof teller.buyer !== 'boolean') {
      return rej(new Error('Invalid buyer'));
    }
    if (!teller.buyRates || Number.isNaN(teller.buyRates)) {
      return rej(new Error('Invalid buy rates'));
    }
    return res();
  });

export default validateTeller;
