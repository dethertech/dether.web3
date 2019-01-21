import { validateShop, validateTeller } from '../constants';

const sellPoints = {
  shop: 'shop',
  teller: 'teller',
};

const validateSellPoint = async (rawSellPoint, sellPoint) => {
    if (sellPoint === sellPoints.teller) {
      return validateTeller(rawSellPoint);
    }
      return validateShop(rawSellPoint);
};

export default validateSellPoint;
