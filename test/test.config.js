import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Chaithereum from 'chaithereum';

const chaithereum = new Chaithereum();

chai.use(chaiAsPromised);
chai.should();

global.window = {
  web3: new chaithereum.Web3(chaithereum.provider),
};
