import DthContract from 'dethercontract/contracts/DetherToken.json';

/**
 * Get DTH contract
 * @param  {object} web3js web3js instance
 * @param  {string} id     network id
 * @return {object}        contract abi
 */
function getDthContract(web3js, id) {
  return new Promise(async (res, rej) => {
    try {
      const dthContract =
        new web3js.eth
          .Contract(DthContract.abi, DthContract
            .networks[id]
            .address);

      res(dthContract);
    } catch (e) {
      rej(e);
    }
  });
}

export default getDthContract;
