/**
 * getBalance return eth and dth balances from eth address
 * @return {object} eth & dth balances
 */
function getBalance() {
  return new Promise(async (res, rej) => {
    try {
      this.web3js.eth.getBalance(this.address).then(async (result, error) => {
        if (!error) {
          res({
            eth: parseFloat(this.web3js.utils.fromWei(result, 'ether')),
            // TODO: error test
            // dth: parseFloat(this.web3js.utils.fromWei(
            //   await this.getDthContract
            //   .methods.balanceOf('0805fDe3043251af5F86dE007f008d2F5CF8D2bB').call(),
            //   'ether',
            // )),
          });
        } else {
          rej(new TypeError(`Invalid shop profile: ${error.message}`));
        }
      });
    } catch (e) {
      rej(e);
    }
  });
}

export default getBalance;
