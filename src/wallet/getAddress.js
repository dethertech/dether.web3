/**
 * Get eth address
 * @return {string} ethereum address
 */
function getAddress(web3js) {
  return new Promise(async (res, rej) => {
    try {
      const addr = await web3js.eth.getAccounts();
      res(addr[0]);
    } catch (e) {
      rej(e);
    }
  });
}

export default getAddress;
