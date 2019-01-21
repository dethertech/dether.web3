import BN from 'bn.js';
import defineProperty from './defineProp';

// TODO: quick fix for ethers BigNumber class for just strings 
class BigNumber {
  constructor(value) {
    if (value == '') { value = '0'; }
    else { value = new BN(value); }
     defineProperty(this, '_bn', value);
  }
}

export default BigNumber