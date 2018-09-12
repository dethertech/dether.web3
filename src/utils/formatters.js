import Web3 from 'web3';
import shopFromContract from './shopFromContract';
import shopToContract from './shopToContract';
import tellerFromContract from './tellerFromContract';
import tellerToContract from './tellerToContract';


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
// TODO: treating an object like an array here? - use string values? rewReput['buyVolume']

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


module.exports = { sellPointFromContract, sellPointToContract, reputFromContract };
