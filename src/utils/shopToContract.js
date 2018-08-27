import { intTo5bytes, toNBytes } from './intToBytes';
import { validateShop } from '../constants';

/**
 * Formate shop data
 * @param  {object} rawshop shop data
 * @return {object}         formated shop data
 */
const shopToContract = (rawshop) => {
  const validation = validateShop(rawshop);
  if (validation.error) throw new TypeError(validation.msg);
  const lat = intTo5bytes(parseFloat(rawshop.lat) * 100000);
  const lng = intTo5bytes(parseFloat(rawshop.lng) * 100000);

  const hexshopGeo = `0x31${lat}${lng}`;
  const hexShopAddr = `${toNBytes(rawshop.countryId, 2)}${toNBytes(rawshop.postalCode, 16)}`;
  const hexShopId = `${toNBytes(rawshop.cat, 16)}${toNBytes(rawshop.name, 16)}`;
  const hexShopDesc = `${toNBytes(rawshop.description, 32)}${toNBytes(rawshop.opening, 16)}31`;

  return (`${hexshopGeo}${hexShopAddr}${hexShopId}${hexShopDesc}`);
};

export default shopToContract;
