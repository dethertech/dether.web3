import ExchangeRateOracle from 'dethercontract/contracts/ExchangeRateOracle.json';

// const getExchangeRateOracleContract = (web3js, id) => new web3js.eth.Contract(ExchangeRateOracle.abi, ExchangeRateOracle.networks[id].address);
const getExchangeRateOracleContract = (web3js, id) => new web3js.eth.Contract(ExchangeRateOracleContract.abi, '0x913db55b60c09a6d980fc54a9f94e6f2063f7973');

export default getExchangeRateOracleContract;
