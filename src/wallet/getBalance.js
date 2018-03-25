/**
 * getBalance return eth and dth balances from eth address
 * @return {object} eth & dth balances
 */
function getBalance() {
  return new Promise(async (res, rej) => {
    try {
      if (!this.address) rej(new Error('Invalid ethereum address'));
      else {
        this.web3js.eth.getBalance(this.address)
          .then(async (result, error) => {
            if (!error) {
              return res({
                eth: parseFloat(this.web3js.utils.fromWei(result, 'ether')),
                // TODO: error test
                // dth: parseFloat(this.web3js.utils.fromWei(
                //   await this.getDthContract
                //   .methods.balanceOf(this.address).call(),
                //   'ether',
                // )),
              });
            }
            return rej(new TypeError(`Invalid shop profile: ${error.message}`));
          });
      }
    } catch (e) {
      rej(new Error(e));
    }
  });
}

export default getBalance;
