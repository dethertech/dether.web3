/**
 * Validation shop
 * @param  {object} shop shop info from smartcontract
 */
const validateShop = (shop) =>
  new Promise((res, rej) => {
    if (!shop || typeof shop !== 'object') {
      return rej(new Error('Invalid args'));
    }
    // if (!shop.lat || Number.isNaN(shop.lat) || shop.lat > 90 || shop.lat < -90) {
    //   return { error: true, msg: 'Invalid latitude' };
    // }
    // if (!shop.lng || Number.isNaN(shop.lng) || shop.lng > 180 || shop.lng < -180) {
    //   return { error: true, msg: 'Invalid longitude' };
    // }
    // if (!shop.countryId || shop.countryId < 1 ||  shop.countryId > 4) {
    //   return { error: true, msg: 'Invalid zone' };
    // }
    // if (!shop.rates || shop.rates <= 0 || shop.rates > 100) {
    //   return { error: true, msg: 'Invalid rates' };
    // }
    // if (!shop.avatarId || !Number.isInteger(shop.avatarId) || shop.avatarId < 0) {
    //   return { error: true, msg: 'Invalid avatar' };
    // }
    // if (!shop.currencyId || !Number.isInteger(shop.currencyId) || shop.currencyId < 0) {
    //   return { error: true, msg: 'Invalid currency' };
    // }
    // if (!shop.messengerAddr || shop.messengerAddr.length < 2 || shop.messengerAddr.length > 30) {
    //   return { error: true, msg: 'Invalid telegram' };
    // }
    // if (!shop.amount || Number.isNaN(shop.amount) || shop.amount < 0.01) {
    //   return { error: true, msg: 'Invalid amount' };
    // }
    // if (!shop.postalCode) {
    //   return { error: true, msg: 'Invalid amount' };
    // }
    return res();
  });

export default validateShop;
