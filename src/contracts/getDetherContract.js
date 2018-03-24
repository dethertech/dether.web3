import DetherCore from 'dethercontract/contracts/DetherCore.json';

/**
 * Get Dether contract
 * @param  {object} web3js web3js instance
 * @param  {string} id     network id
 * @return {object}        contract abi
 */
function getDetherContract(web3js, id) {
  return new Promise(async (res, rej) => {
    try {
      const detherContract =
        new web3js.eth
          .Contract(DetherCore.abi, DetherCore
            .networks[id]
            .address);

      res(detherContract);
    } catch (e) {
      rej(e);
    }
  });
}

export default getDetherContract;
