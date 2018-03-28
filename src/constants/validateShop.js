/**
 * Validation shop
 * @param  {object} shop shop info from smartcontract
 */
const validateShop = (shop) =>
  new Promise((res, rej) => {
    if (!shop || typeof shop !== 'object') {
      return rej(new Error('Invalid args'));
    }
    if (!shop.lat || Number.isNaN(shop.lat) || shop.lat > 90 || shop.lat < -90) {
      return rej(new Error('Invalid latitude'));
    }
    if (!shop.lng || Number.isNaN(shop.lng) || shop.lng > 180 || shop.lng < -180) {
      return rej(new Error('Invalid longitude'));
    }
    if (!shop.countryId || shop.countryId.length !== 2) {
      return rej(new Error('Invalid country ID'));
    }
    if (!shop.postalCode || typeof shop.postalCode !== 'string' || shop.postalCode.length > 16) {
      return rej(new Error('Invalid postal code'));
    }
    if (!shop.cat || typeof shop.cat !== 'string' || shop.cat.length > 16) {
      return rej(new Error('Invalid categorie'));
    }
    if (!shop.name || typeof shop.name !== 'string' || shop.name.length > 16) {
      return rej(new Error('Invalid categorie'));
    }
    if (!shop.description || typeof shop.description !== 'string' || shop.description.length > 32) {
      return rej(new Error('Invalid categorie'));
    }
    if (!shop.opening || typeof shop.opening !== 'string' || shop.opening.length > 14) {
      return rej(new Error('Invalid categorie'));
    }
    return res();
  });

export default validateShop;
