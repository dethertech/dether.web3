import DthContract from 'dethercontract/contracts/DetherToken.json';

/**
 * Get DTH contract
 * @param  {object} web3js web3js instance
 * @param  {string} id     network id
 * @return {object}        contract abi
 */
// function getDthContract(web3js, id) {
//   return new Promise(async (res, rej) => {
//     try {
//       const dthContract =
//         new web3js.eth
//           .Contract(DthContract.abi, DthContract
//             .networks[id]
//             .address);

//       res(dthContract);
//     } catch (e) {
//       rej(e);
//     }
//   });
// }

// const getDthContract = (web3js, id) => new web3js.eth.Contract(DthContract.abi, DthContract.networks[id].address);
const getDthContract = (web3js, id) => new web3js.eth.Contract(DthContract.abi, '0x9027E9FC4641e2991A36Eaeb0347Bc5b35322741');

export default getDthContract;
