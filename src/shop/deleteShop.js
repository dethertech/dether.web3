/**
 * Delete shop from the smart contract
 * @return {[type]} [description]
 */
function deleteShop() {
  return new Promise(async (res, rej) => {
      try {
        if (!this.detherContract || !this.detherContract._address) {
          return rej(new Error('Invalid Dether contract address'));
        }

        if (!this.address) return rej(new Error('Invalid ethereum address'));

        const tsx = await this.detherContract
          .methods
          .deleteShop()
          .send({
            from: this.address,
            gas: 150000,
          });

        return res(tsx);
      } catch (e) {
        return rej(new TypeError(`Invalid transaction: ${e.message}`));
      }
    });
}

export default deleteShop;
