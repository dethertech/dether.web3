/**
 * Get Transaction status
 * @param  {string} hash transaction hash
 * @return {sting}       transaction status
 */
function getTransactionStatus(hash) {
  return new Promise(async (res, rej) => {
    try {
      if (!hash || !/^0x([A-Fa-f0-9]{64})$/.test(hash)) {
        return rej(new Error('Invalid transaction hash'));
      }

      const transaction = await this.web3js.eth.getTransactionReceipt(hash);

      if (!transaction) res('pending');
      else if (transaction.status === '0x1') res('success');
      return res('error');
    } catch (e) {
      return rej(e);
    }
  });
}

export default getTransactionStatus;
