import erc20 from 'dethercontract/contracts/ERC20.json';

/**
 * Get SMS contract
 * @param  {object} web3js web3js instance
 * @param  {string} id     network id
 * @return {object}        contract abi
 */
// function getErc20Contract(web3js, address) {
//   return new Promise(async (res, rej) => {
//     try {
//       const erc20Contract =
//         new web3js.eth
//           .Contract(erc20.abi, address);
//       res(erc20Contract);
//     } catch (e) {
//       rej(e);
//     }
//   });
// }

const getErc20Contract = (web3js, address) => new web3js.eth.Contract(erc20.abi, address);


export default getErc20Contract;
