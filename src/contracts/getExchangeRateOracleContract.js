import ExchangeRateOracle from 'dethercontract/contracts/ExchangeRateOracle.json';

const getExchangeRateOracleContract = (web3js, id) => new web3js.eth.Contract(ExchangeRateOracle.abi, ExchangeRateOracle.networks[id]['address']);

export default getExchangeRateOracleContract;
