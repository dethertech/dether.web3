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

// can't promisify this if we are to set it in the synchronous init() now
// const getSmsContract = (web3js, id) => new web3js.eth.Contract(SmsCertifier.abi, SmsCertifier.networks[id].address);
const getSmsContract = (web3js, id) => new web3js.eth.Contract(SmsCertifier.abi, '0x4ee1f732e64826b616cd80b5fff3c6bce54b7035');


export default getSmsContract;
