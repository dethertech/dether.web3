import Web3 from 'web3';
import shopFromContract from './shopFromContract';
import shopToContract from './shopToContract';
import tellerFromContract from './tellerFromContract';
import tellerToContract from './tellerToContract';
// import toNBytes from './intToBytes';

const sellPoints = {
  shop: 'shop',
  teller: 'teller',
};

const sellPointToContract = (rawSellPoint, sellPoint) => {
    if (sellPoint === sellPoints.teller) {
      return tellerToContract(rawSellPoint);
    }
      return shopToContract(rawSellPoint);
};

const sellPointFromContract = (rawSellPoint, sellPoint) => {
  if (sellPoint === sellPoints.teller) {
    return tellerFromContract(rawSellPoint);
  }
  return shopFromContract(rawSellPoint, Web3);
};

const addEthersDec = strNum => strNum.includes('.') ? strNum : strNum + '.0'; 

const reputFromContract = (rawReput) => {
  try {
    return {
      buyVolume: addEthersDec(Web3.utils.fromWei(rawReput[0], 'ether')),
      sellVolume: addEthersDec(Web3.utils.fromWei(rawReput[1], 'ether')),
      numTrade: parseInt(rawReput[2]),
    };
  } catch (e) {
    throw new TypeError(`Invalid reput: ${e.message}`);
  }
};

const toNBytes = (str, n) => {
  if (!str || !n) return 0;

  let buffer = '';

  for (let i = 0; i < n; i += 1) {
    buffer += str[i] ? str[i].charCodeAt(0).toString(16) : '00';
  }
  return buffer;
};

const updateToContract = (rawUpdate) => {
  try {
    return {
      currencyId: parseInt(rawUpdate.currencyId, 10),
      messenger: `0x${toNBytes(rawUpdate.messenger, 16)}`,
      avatarId: parseInt(rawUpdate.avatarId, 10),
      rates: parseInt(parseFloat(rawUpdate.rates, 10) * 10, 10),
      online: true,
    }
  } catch(e) {
    throw new TypeError(`Invalid update profile`);
  }
}

module.exports = { sellPointFromContract, sellPointToContract, reputFromContract, updateToContract };
