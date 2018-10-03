  /**
   * Send a raw transaction and await successful confirmation
   * @param {object} web3js web3 istance
   * @param {object} tx transaciton
   * @param {number} confirmationsRequired optional
   * @return {Object} receipt
   */
   const sendTransaction = (web3js, tx, confirmationsRequired = 1, justHash = true) =>
    new Promise(async (res, rej) => {
      web3js.eth.sendTransaction(tx)
        .on('transactionHash', (hash => {
          if (justHash) {
            return res(hash);
          }
          console.log(`Transaction hash:  ${hash}`);
        }))
        .on('receipt', (() => {
          console.log('Awaiting confirmations...');
        }))
        .on('confirmation', ((confirmationNumber, receipt) => {
          if (!justHash) {
          if (confirmationNumber === confirmationsRequired) {
            if (web3js.utils.toHex(receipt.status) === '0x01') {
              console.log('Transaction confirmed. Status: success');
              return res(receipt);
            }
            console.log(`Error. Transaction status: ${web3js.utils.toHex(receipt.status)}`);
            return rej(receipt);
           }
          }
        }))
        .on('error', (error => {
          rej(error);
        }));
    });


    /**
   * Get Transaction status
   * @param  {string} hash transaction hash
   * @return {string}       transaction status
   */
  const getTransactionStatus = (hash) =>
    new Promise(async (res, rej) => {
      try {
        const transaction = await this._web3js.eth.getTransactionReceipt(hash);

        if (!transaction) res('pending');
        else if (this._web3js.utils.toHex(transaction.status) === '0x01') res('success');
        return res('error');
      } catch (e) {
        return rej(new Error(e));
      }
    });

module.exports = { sendTransaction, getTransactionStatus }