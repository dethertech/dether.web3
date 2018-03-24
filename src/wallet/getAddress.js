/**
 * Get eth address
 * @return {string} ethereum address
 */
function getAddress() {
  return new Promise(async (res, rej) => {
    try {
      const addr = await this.web3js.eth.getAccounts();
      res(addr[0]);
    } catch (e) {
      rej(e);
    }
  });
}

export default getAddress;
