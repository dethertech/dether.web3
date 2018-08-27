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

module.exports = { sellPointFromContract, sellPointToContract };
