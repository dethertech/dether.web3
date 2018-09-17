import DetherBank from 'dethercontract/contracts/DetherBank.json';

// const getDetherBank = (web3js, id) => new web3js.eth.Contract(DetherBank.abi, DetherBank.networks[id].address);
const getDetherBank = (web3js, id) => new web3js.eth.Contract(DetherBank.abi, '0x529a4d329111c2cdce15ba573d444a9513c61346');

export default getDetherBank;
