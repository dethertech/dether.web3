const shopFromContract = (rawShop, web3js) => {
  const validation = validateShop(rawShop);
  if (validation.error) throw new TypeError(validation.msg);
  try {
    return {
      lat: parseFloat(rawShop.lat) / 100000,
      lng: parseFloat(rawShop.lng) / 100000,
      countryId: web3js.utils.hexToUtf8(rawShop.countryId).replace(/\0/g, ''),
      postalCode: web3js.utils.hexToUtf8(rawShop.postalCode).replace(/\0/g, ''),
      cat: web3js.utils.hexToUtf8(rawShop.cat).replace(/\0/g, ''),
      name: web3js.utils.hexToUtf8(rawShop.name).replace(/\0/g, ''),
      description: web3js.utils.hexToUtf8(rawShop.description).replace(/\0/g, ''),
      opening: web3js.utils.hexToUtf8(rawShop.opening).replace(/\0/g, ''),
    };
  } catch (e) {
    throw new TypeError(`Invalid shop profile: ${e.message}`);
  }
};

export default shopFromContract;
