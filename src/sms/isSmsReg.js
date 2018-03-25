/**
 * is the user registered
 * @return {Boolean} returns a boolean if the user is registered
 */
function isSmsReg() {
  return new Promise(async (res, rej) => {
    try {
      if (!this.address) return rej(new Error('Invalid ethereum address'));
      if (!this.smsContract || !this.smsContract._address) {
        return rej(new Error('Invalid Sms contract address'));
      }
      const isReg = await this.smsContract
        .methods
        .certified(this.address)
        .call();
      return res(isReg);
    } catch (e) {
      return rej(e);
    }
  });
}

export default isSmsReg;
