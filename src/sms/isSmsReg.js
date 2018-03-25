/**
 * is the user registered
 * @return {Boolean} returns a boolean if the user is registered
 */
function isSmsReg() {
  return new Promise(async (res, rej) => {
    try {
      const isReg = await this.smsContract
        .methods
        .certified(this.address)
        .call();
      res(isReg);
    } catch (e) {
      rej(e);
    }
  });
}

export default isSmsReg;
