import SmsCertifier from 'dethercontract/contracts/SmsCertifier.json';

/**
 * Get SMS contract
 * @param  {object} web3js web3js instance
 * @param  {string} id     network id
 * @return {object}        contract abi
 */
// function getSmsContract(web3js, id) {
//   return new Promise(async (res, rej) => {
//     try {
//       const smsContract =
//         new web3js.eth
//           .Contract(SmsCertifier.abi, SmsCertifier
//             .networks[id]
//             .address);

//       res(smsContract);
//     } catch (e) {
//       rej(e);
//     }
//   });
// }

const getSmsContract = (web3js, id) => new web3js.eth.Contract(SmsCertifier.abi, SmsCertifier.networks[id]['address']);

export default getSmsContract;
