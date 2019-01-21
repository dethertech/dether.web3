/**
 * Get eth address
 * @return {string} ethereum address
 */
// function getAddress(web3js) {
//   return new Promise(async (res, rej) => {
//     try {
//       const addr = await web3js.eth.getAccounts();
//       res(addr[0]);
//     } catch (e) {
//       rej(e);
//     }
//   });
// }


function getAddress(windowWeb3) {
  try {
  const currAddress = windowWeb3.eth.defaultAccount;
  return currAddress.lowerCase();
  } catch (e) {
    throw new Error('Error unable to get default Account from web3 instance', e)
  }
}

export default getAddress;
