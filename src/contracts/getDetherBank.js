import DetherBank from 'dethercontract/contracts/DetherBank.json';

const getDetherBank = (web3js, id) => new web3js.eth.Contract(DetherBank.abi, DetherBank.networks[id]['address']);

export default getDetherBank;
